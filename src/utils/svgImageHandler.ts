const svgToBase64 = (svgImage: string): string => {
    const escapedSvg: string = encodeURIComponent(svgImage)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

    return `data:image/svg+xml;charset=utf-8,${escapedSvg}`;
}

export { svgToBase64 };