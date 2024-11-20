export interface User {
    email: string;
    name: string;
}

export interface IUserContext {
    userInfo?: User;
    setUserInfo?: (user: User | undefined) => void;
}

export interface Animal {
    desertionNo: string;    // 유기번호
    filename: string;       // 썸네일이미지url
    happenDt: string;       // 접수일
    happenPlace: string;    // 발견장소
    kindCd: string;         // 품종
    colorCd: string;        // 색상
    age: string;            // 나이
    weight: string;         // 체중
    noticeNo: string;       // 공고번호
    noticeSdt: string;      // 공고시작일
    noticeEdt: string;      // 공고종료일
    popfile: string;        // 이미지
    processState: string;   // 상태
    sexCd: string;          // 성별
    neuterYn: string;       // 중성화여부
    specialMark: string;    // 특징
    careNm: string;         // 보호소이름
    careTel: string;        // 보호소전화번호
    careAddr: string;       // 보호장소
    orgNm: string;          // 관할기관
    chargeNm: string;       // 담당자
    officetel: string;      // 담당자 연락처
}

export interface PaingAnimal {
    page: number;
    data: Animal[];
}
