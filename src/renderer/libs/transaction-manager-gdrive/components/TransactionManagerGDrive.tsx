import { useCallback, useEffect, useState } from "react";
import { useDriveFileQueries } from "../../../../shared/google-api/hooks/use-drive-file-queries";
import { TransactionFileAccordion, TransactionFileData, TransactionFileLoading, TransactionFileMeta } from "../../transaction-file";
import { DoneAll, HourglassBottom } from "../../../shared/icons";
import { useTransactionFileListGDrive } from "../hooks";
import { useGoogleAPI } from "../../../../shared/google-api";

const FileLoadingProgress = ({ progress }: { progress: number }) => {
  const fileLoadingPercentage = Math.round(progress * 100);

  return <><HourglassBottom /> Files loading: {fileLoadingPercentage}%...</>
};

const FileLoading = ({ progress }: { progress: number }) => {
  if (progress === 1) {
    return <><DoneAll /> File loading complete.</>
  }

  return <FileLoadingProgress progress={progress} />
};

export const TransactionManagerGDrive = () => {
  const { isLoading, signIn } = useGoogleAPI();
  const { isFetching, list: initialFileList } = useTransactionFileListGDrive();
  const [fileList, setFileList] = useState<TransactionFileMeta[]>([]);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const fileData = useDriveFileQueries(fileList.map(({ id }) => id));

  const handleSignIn = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signIn();
  }

  const getCompletedFileDownloads = useCallback(
    () => fileData.filter(({ isSuccess }) => isSuccess),
    [fileData]
  );

  const handleFileToggle = (fileId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFile(isExpanded ? fileId : null);
  };

  // TODO: Loading spinners and progress bars.

  useEffect(() => {
    const denominator = fileData.length;
    if (denominator > 0) {
      const progress = fileData.filter(({ isFetched }) => isFetched).length / denominator;
      setProgress(progress);
    }
  }, [fileData]);

  // Probably getting into custom hook territory if we're checking the file loading status.
  useEffect(() => {
    if (getCompletedFileDownloads().length > 0) {
      let hasChanges = false;
      const updated: TransactionFileMeta[] = [];
      for (let i = 0; i < fileList.length; i += 1) {
        if (fileData[i].isSuccess && !fileList[i].data) {
          hasChanges = true;
          updated.push({
            ...fileList[i],
            data: fileData[i].data
          });
        } else {
          updated.push(fileList[i]);
        }
      }
      if (hasChanges) {
        setFileList(updated);
      }
    }
  }, [getCompletedFileDownloads().length, fileList]);

  useEffect(() => {
    if (initialFileList.length > 0) {
      setFileList(initialFileList);
    }
  }, [initialFileList]);

  if (isLoading) {
    <div>Loading Google API client...</div>
  }

  if (isFetching) {
    <div>Fetching file list...</div>
  }

  return (
    <div>
      <div>
        Todo: Find a good way of viewing the signed in status.
        <button onClick={handleSignIn}>Sign In</button>
      </div>

      <div>
        <FileLoading progress={progress} />
      </div>
      <div>
        {fileList.map((transactionFile) => {
          const { data, id, name } = transactionFile;
          return (data ?
            <TransactionFileAccordion
              key={id}
              isExpanded={expandedFile === id}
              setIsExpanded={handleFileToggle(id)}
              transactionFile={transactionFile as TransactionFileData}
            /> : 
            <TransactionFileLoading key={id} fileName={name} />
          );
        })}
      </div>
    </div>
  );
};
