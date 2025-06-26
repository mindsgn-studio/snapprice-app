const replaceString = (link: string) => {
    const newLink = link.replace("{size}", "pdpxl");
    return newLink
}

export { replaceString }