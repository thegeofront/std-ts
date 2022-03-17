export interface XYZ {
    type: "multi-vector",
    header: string[],
    width: number,
    height: number,
    data: Float32Array,
}

export function readXYZ(text: string) : XYZ | undefined {

    const lines = text.split("\n");
    if (lines.length == 0) return undefined;

    const header = lines[0].trim().split(' ');
    const width = header.length;
    const data = new Float32Array((lines.length - 1) * width);
    let height = 0;
    
    for (let i = 0; i < lines.length - 1; i++) {
        const str = lines[i+1].trim();
        if (str == "" ) continue;
        const parts = str.split(' ');
        for (let [j, part] of parts.entries()) {
            data[i*width + j] = parseFloat(part);
        }
        height += 1;
    }

    return {type: "multi-vector", data, width, height, header};
}

export function writeXYZ(xyz: XYZ) : string {

    let lines: string[] = [];

    const {header, width, data, height} = xyz;

    lines.push(header.join(" "));

    for (let i = 0 ; i < height ; i ++) {
        let values = [];
        for (let j = 0 ; j < width ; j++) {
            values.push(data[i*width + j])
        }
        lines.push(values.join(" "));
    }

    return lines.join("\n");
}