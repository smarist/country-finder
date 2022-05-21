
export function getLanguages(languages){
    let languagesArr = []
    for (const key in languages){
        languagesArr.push(languages[key])
    }
    return languagesArr.map(language =>(<span key={language}>{language}</span>))
}

