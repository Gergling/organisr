import { parse } from 'papaparse';
import { useQueries } from "@tanstack/react-query";
// Nothing in src/shared should be referencing anything in src/renderer
import { HalifaxCurrentAccountCSVTransaction, TransactionType } from '../../../renderer/libs/transaction-file';

const URL = 'https://www.googleapis.com/drive/v3/files';

const fetchDriveFile = (fileId: string) => {
  const { gapi: { auth } } = window;
  const { access_token: accessToken } = auth.getToken();
  const fetchOptions = { headers: { Authorization: `Bearer ${accessToken}` } };
  return fetch(`${URL}/${fileId}?alt=media`, fetchOptions).then(res => res.blob());
}

const convertFileToText = (blob: Blob, name: string) => new Promise<string | ArrayBuffer | null>((resolve, reject) => {
  const fileOptions = { type: 'text/csv' };
  const file = new File([blob], name, fileOptions);
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onloadend = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = (e) => {
    reject(e);
  };
});

const fetchDriveCSV = async (fileId: string) => {
  try {
    const blob = await fetchDriveFile(fileId);
    const fileText = await convertFileToText(blob, fileId) as string;
    // TODO: Return headers first.
    // Find the correct type based on the headers.
    // Pick a suitable function.
    // Possibly this is where the conversion should happen?
    // That means this is where we would create the general transactions.
    // Also the parsing function has the ability to fetch from a url.
    // That may be worth a spin.
    const { data } = parse<HalifaxCurrentAccountCSVTransaction>(fileText, {
      delimiter: ',',
      // download: true, // TODO: See if we can't just download the file directly and skip a couple of functions.
      // If so:
      // complete: (results) => { /* ... when done. */ },
      // If the file is huge:
      // step: (row) => { console.log(row.data); },
      // Also, if we're going to be fetching and processing a large file:
      // worker: true,
      // This might not improve matters if the file isn't large enough to matter.
      header: true,
      skipEmptyLines: true,
    });
    // This hack is VERY temporary when we get anywhere near other account data.
    return data.map((csvTransaction) => ({ ...csvTransaction, type: 'halifax-current' as TransactionType }));
  } catch (error) {
    console.error('Failed for fileId:', fileId, error);
    throw error;
  }
}

export const useDriveFileQueries = (fileIds: string[]) => useQueries({
  queries: fileIds.map((fileId) => ({
    queryFn: () => fetchDriveCSV(fileId),
    queryKey: ['fetch-csv', fileId],
  })),
});
