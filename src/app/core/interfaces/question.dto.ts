

enum typeQuestion {
    question=1,
    boolean=2,
    texto=3
}
export interface Question { 
    id?: number;
    type?:number; 
    typevalueboolean?: boolean,
    typevaluetext?: string,        
    questionTrad?: DetailTrad[],
    requestTrad? : RequesTrad[], 
    difficult?:boolean, 
    category?:number,
    dateInit?:string,
    dateUpdate?:string
}

export interface Category {
    id?: number;
    color: number,
    dataTrad?:DetailTrad[],
    dateInit?:string;
    dateUpdate?:string;
}  
 

export interface Color {
    id?: number;
    ds?: string,
}

export interface DetailTrad {
    ds?:string, 
    idi?:number
}

export interface RequesTrad {
    answer?: DetailTrad[] 
}

export interface ExcelData{
    id?:number,  
    Question?:string, 
    answerOk?:string,
    answerLong?:string,
    answer2Ko?:string,
    answer3Ko?:string,
    category?:string
}

// NULL---

export const NULL_EXCELDATA: ExcelData = {
    id: 0,
    Question:'', 
    answerOk:'', 
    answerLong:'', 
    answer2Ko:'', 
    answer3Ko:'', 
    category:'' 
}

export const NULL_DETAILTRAD: DetailTrad = {
    ds:'.', 
    idi:0
}

export const NULL_REQUESTRAD: RequesTrad = {
    answer: [NULL_DETAILTRAD,NULL_DETAILTRAD,NULL_DETAILTRAD],
    // isCorrect:false
}

export const NULL_COLOR: Color =  {
    id: 0,
    ds: '.'
}

export const NULL_CATEGORY: Category =  {
    id: 0,
    color: 0,
    dataTrad:[NULL_DETAILTRAD,NULL_DETAILTRAD,NULL_DETAILTRAD],
    dateInit:'',
    dateUpdate:''
} 

export const NULL_QUESTION: Question =  { 
    id: 0,
    type:typeQuestion.question, 
    typevalueboolean: false,
    typevaluetext: '',        
    questionTrad: [NULL_DETAILTRAD,NULL_DETAILTRAD,NULL_DETAILTRAD],
    requestTrad : [NULL_REQUESTRAD,NULL_REQUESTRAD,NULL_REQUESTRAD,NULL_REQUESTRAD],     
    difficult:false, 
    category:0,      
    dateInit:'',
    dateUpdate:''
}