What is the final data structure to use?
    -> Must include all filter data in an object
    -> As well as the `paramKey` to be used in the URL
    -> This is important because the data needs to be written correctly

type deptFilterData = {
    paramKey: ParamKey,

    filters: {
        ... ,

        ENGINEERING: {
            uid: DeptFilterUID,
            discoveredAt: Timestamp,
            seenUnchangedAt: Timestamp,
            history: filterDataHistory[],
        }
        
        ... ,
    }

}

type filterDataHistory = {
    uid: DeptFilterUID,
    discoveredAt: Timestamp,
    updatedAt: Timestamp,
}

type ParamKey: string;
type DeptFilterUID: string;
type Timestamp: number;