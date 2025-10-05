const svgToBase64 = (svgImage: string): string => {
    const base64 = Buffer.from(svgImage).toString('base64');
    console.log(base64)
    return `data:image/svg+xml;base64,${base64}`;
}

export { svgToBase64 };