/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// Do note that this file is largely for testing purposes and useful functionality
// will ultimately be moved to a more suitable location (probably a hook) before
// this component is dumped altogether.

import { useEffect, useState } from "react";
import { useGoogleAPI } from "../hooks/use-google-api";
import { GOOGLE_API_TRANSACTION_FOLDER } from "../constants";

const useGoogleDriveFileList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [list, setList] = useState<gapi.client.drive.File[]>([]);
  const { getClient, isLoading } = useGoogleAPI();

  const fetchTransactionFiles = async () => {
    if (!isLoading && getClient()) {
      try {
        const { result: { files }} = await getClient().drive.files
          .list({
            fields: 'nextPageToken, files(id, name)',
            q: `'${GOOGLE_API_TRANSACTION_FOLDER}' in parents and trashed=false`,
          });

        setList(files);
        setIsFetching(false);
        return files;
      } catch (error) {
        setIsFetching(false);
        console.error(error);
        throw error;
      }
    } else {
      throw new Error('This could do with a really good error message.');
    }
  }

  useEffect(() => {
    if (!isLoading && getClient()) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchTransactionFiles();
    }
  }, [isLoading, getClient]);

  return {
    isFetching,
    list,
  }
};

export const Drive = () => {
  const { isLoading } = useGoogleAPI();
  const { isFetching, list } = useGoogleDriveFileList();
  
  const isReady = !isFetching && !isLoading;

  return <div>
    Drive component has initiated.
    {isLoading && <div>Loading...</div>}
    {isFetching && <div>Fetching...</div>}
    {isReady && 
      <ol>
        {list.map(({ name }) => <li key={name}>{name}</li>)}
      </ol>
    }
  </div>
};
