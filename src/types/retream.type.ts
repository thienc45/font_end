export interface Restream{
    id: number
    gioBatDau: string
    gioKetThuc: string
    url: string
}

export type Restreams  = Pick<Restream,'id'|'gioBatDau'|'gioKetThuc'|'url'>[]