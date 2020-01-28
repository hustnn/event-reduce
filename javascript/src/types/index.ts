import { ChangeEvent } from './change-event';

export * from './change-event';

export type WriteOperation = 'INSERT' | 'UPDATE' | 'DELETE';
export type UNKNOWN = 'UNKNOWN';

export type ResultKeyDocumentMap<DocType> = Map<string, DocType>;

export type ActionName = string;
export type StateName = 'hasLimit' |
    'hasSkip' |
    'isDelete' |
    'isInsert' |
    'isUpdate' |
    'previousStateUnknown' |
    'wasLimitReached' |
    'sortParamsChanged' |
    'wasInResult' |
    'wasSortedBeforeFirst' |
    'wasSortedAfterLast' |
    'isSortedAfterLast' |
    'isSortedBeforeFirst' |
    'wasMatching' |
    'doesMatchNow';

export interface QueryParams<DocType> {
    primaryKey: string;
    sortFields: string[];
    skip: number;
    limit: number;
    queryMatcher: QueryMatcher<DocType>;
    sortComparator: SortComparator<DocType>;
}

export type QueryMatcher<DocType> = (doc: DocType) => boolean;
export type SortComparator<DocType> = (a: DocType, b: DocType) => 1 | 0 | -1;


/**
 * A map contains a stateSet as key and an ActionName as value
 * State-sets that are not in the Map have 'runFullQueryAgain' as value
 * 
 * The key is a binary-representation of the ordered state-list
 * like '010110110111...'
 * where the first '0' means that the first state is false
 */
export type StateSet = string;
export type StateSetToActionMap = Map<StateSet, ActionName>;

export interface StateResolveFunctionInput<DocType> {
    queryParams: QueryParams<DocType>;
    changeEvent: ChangeEvent<DocType>;
    previousResults: DocType[];
    keyDocumentMap?: ResultKeyDocumentMap<DocType>;
}

export type StateResolveFunction<DocType> = (
    input: StateResolveFunctionInput<DocType>
) => boolean;