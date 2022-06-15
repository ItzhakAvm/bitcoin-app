import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { RecordResponse } from '../types/crypto';

type RecordResponseState = RecordResponse | null;

type RecordResponseStateKeeper =
  | [RecordResponseState, Dispatch<SetStateAction<RecordResponseState>>]
  | null;

export const RecordResponseContext =
  createContext<RecordResponseStateKeeper>(null);

export const useRecordResponseContext = (): Exclude<
  RecordResponseStateKeeper,
  null
> => {
  const context = useContext<RecordResponseStateKeeper>(RecordResponseContext);

  if (context === null) throw new Error(); // Unreachable

  return context;
};

export const RecordResponseProvider = (
  props: PropsWithChildren<object>,
): JSX.Element => {
  const recordResponseState = useState<RecordResponseState>(null);

  return (
    <RecordResponseContext.Provider value={recordResponseState}>
      {props.children}
    </RecordResponseContext.Provider>
  );
};
