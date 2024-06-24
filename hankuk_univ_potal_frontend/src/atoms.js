import {atomWithStorage, createJSONStorage} from 'jotai/utils';

export const initMember = {id:'', name:'', password:''};
export const initLecture = {lecNo: '', credit: 0, sect: '', time1: '', time2: '',
    numOfStd: 0, files: '', lecRoom: '',  status: '', isScoreChk: null, year: 0,  semester: '',
    subCd: '', profNo: '', profName: '', email: '', tel: '', subName: ''}

export const initActiveTab = 0;

export const initOpenIndex = [];

// 공유할 데이터를 분리하여 선언
export const memberAtom = atomWithStorage(
    'member', // 이름
    initMember, // 초기값
    createJSONStorage(()=>sessionStorage),
);

export const lectureAtom = atomWithStorage(
    'lecture',
    initLecture,
    createJSONStorage(()=>sessionStorage),
)

export const tokenAtom = atomWithStorage(
    'token',
    {access_token:'', refresh_token:''},
    createJSONStorage(() => sessionStorage),
);

export const selectedNumberAtom = atomWithStorage(
    'selectedNumber',
    createJSONStorage(()=>sessionStorage),
)

export const lectureNumberAtom = atomWithStorage(
    'lectureNumber',
    createJSONStorage(()=>sessionStorage),
)

export const lectureNameAtom = atomWithStorage(
    'lectureName',
    createJSONStorage(()=>sessionStorage),
)

export const activeTabAtom = atomWithStorage(
    'activeTab',
    'initActiveTab',
    createJSONStorage(()=>sessionStorage),
)

export const openIndexesAtom = atomWithStorage(
    'openIndexesAtom',
    initOpenIndex,
    createJSONStorage(() => sessionStorage),
);