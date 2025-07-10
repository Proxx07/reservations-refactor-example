export interface IProduct {
  id: number
  uuid: string
  ident: string
  category_id: number
  name: string
  description: string
  image_url: string
  big_image_url: string
  price: number
  order: number
  is_combo: number
  weight: string
  unit: number
  status: number
  disabled: number
  unit_label: string
}
export interface ICategory {
  id: number
  uuid: string
  ident: string
  menu_id: number
  parent_id?: number
  name: string
  order: number
  status: number
  image_url: string
  big_image_url: string
  products: IProduct[]
  child?: ICategory[]
}
