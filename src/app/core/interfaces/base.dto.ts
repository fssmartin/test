export interface Language {
    id?: number; 
    ds?:string,
    ds_short?:string 
}


// NULL---

export const NULL_LANGUAGE: Language = {
  id:1,
  ds:'Español',
  ds_short:'es'
}