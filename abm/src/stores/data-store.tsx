import { ChangeEvent } from 'react'
import { createStore } from 'zustand/vanilla'
import { Id } from '../../convex/_generated/dataModel'
import { v4 as uuidv4 } from 'uuid';

type Items = {
    name: string,
    price: string | null,
    itemImage: {
        localImg: string;
        uploadImgUrl: string;
        storageId: Id<"_storage"> | string;
    }
}

export type Sections = {
    id?: string,
    name: string,
    label: string,
    items: Items[],
}

type Combos = {
    title: string,
    description: string,
    imgUrl: { url: string, storageId: Id<"_storage"> | string }[],
    price: string | null,
    id: string;
}

export type Contact = {
    id?: number,
    title: string,
    url: string,
    enabled: boolean,
}

type Header = {
    imgUrl: {
        localImg: string;
        uploadImgUrl: string;
        storageId: Id<"_storage"> | string;
    },
    title: string;
}

export type PaymentMethods = {
    label: string;
    active: boolean;
    comments?: string;
}

export type DeliverMethods = {
    label: string;
    active: boolean;
    comments?: string;
}

export type Layout = {
    bgColor: string;
    textsColor: string;
    templateLayout: string;
    backgroundImg: {
        localImg?: string;
        uploadImgUrl: string;
        storageId: Id<"_storage"> | string;
    };
}

export type ItemCart = {
    label: string;
    price: number;
    quantity: number;
    category: string;
}

export type Widget = {
    type: string;
    title: string;
    enabled: boolean;
    widgetHandler: string;
    id: string;
    data?: WidgetData;
}

export type resizableItem = {
    id: number;
    size: number;
    img?: {
        localImg?: string;
        uploadImgUrl: string;
        storageId: Id<"_storage"> | string;
    };
    value?: string;
    textColor?: string;
    url?: string;
}

export type WidgetData = {
    value?: string;
    url?: string;
    resizables?: resizableItem[];
    textColor?: string;
    img?: {
        localImg?: string;
        uploadImgUrl?: string;
        storageId?: Id<"_storage"> | string;
    }
}

export type DataState = {
    header: Header,
    sections: Sections[],
    combos: Combos[],
    contact: Contact[],
    layout: Layout;
    paymentMethods: PaymentMethods[];
    deliverMethods: DeliverMethods[];
    cart: ItemCart[];
    templateTestId?: string;
    //
    widgets: Widget[];
    orderWidgets: Widget[];
    templateBuildId: Id<'templates'> | undefined;
}

export type DataActions = {
    addSection: () => void
    addItem: (section: string) => void,
    handleOnChangeSections: (event: ChangeEvent<HTMLInputElement>) => void,
    handleOnChangeItems: (event: ChangeEvent<HTMLInputElement>, section: string, item: number, localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => void,
    handleOnChangeHeader: (event: ChangeEvent<HTMLInputElement>, localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => void,
    handleOnChangeCombos: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, combo: number, imgUrl?: string, imgUrlPos?: number, storageId?: Id<"_storage"> | string) => void,
    handleOnChangeContact: (event: ChangeEvent<HTMLInputElement>, iCName: string) => void,
    handleOnChangeContactSwitch: (enabled: boolean, iCName: string) => void,
    handleOnChangeColorSwitch: () => void,
    handleOnChangeLayout: (color: string, type: string) => void,
    handleOnChangePM: (event: ChangeEvent<HTMLInputElement>, label: string) => void,
    handleOnChangePMSwitch: (enabled: boolean, label: string) => void,
    handleOnChangeCart: (item: ItemCart) => void,
    handleOnChangeCartQuantity: (item: ItemCart, type: string) => void,
    handleOnChangeDM: (event: ChangeEvent<HTMLInputElement>, label: string) => void,
    handleOnChangeDMSwitch: (enabled: boolean, label: string) => void,
    deleteSection: (name: string) => void,
    deleteItem: (section: string, item: number) => void,
    deleteImgHeader: () => void,
    deleteImgCombo: (combo: number, imgPos: number) => void,
    setTemplateData: (data: DataState) => void,
    resetState: () => void,
    //
    addWidget: (widget: Widget) => void,
    handleWidgetChanges: (widget: Widget, data: WidgetData) => void;
    deleteWidget: (widget: Widget) => void;
    updateWidgetOrder: (widgets: Widget[]) => void;
    addTemplateBuild: (id: Id<"templates">) => void;
    //
    handleOnChangeBgLayoutImg: (localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => void;
    deleteBgLayoutImg: () => void;
}

export type DataStore = DataState & DataActions

export const defaultInitialState: DataState = {
    header: {
        imgUrl: {
            localImg: '',
            uploadImgUrl: '',
            storageId: '',
        },
        title: '',
    },
    sections: [],
    combos: Array.from({ length: 4 }, (_, i) => ({ description: '', imgUrl: [{ url: '', storageId: '' }], price: null, title: '', id: `combo ${i + 1}` })),
    contact: [],
    layout: {
        bgColor: '#ffffff',
        textsColor: '#000000',
        templateLayout: '',
        backgroundImg: {
            localImg: '',
            uploadImgUrl: '',
            storageId: '',
        },
    },
    paymentMethods: [],
    deliverMethods: [],
    cart: [],
    //
    widgets: [],
    orderWidgets: [],
    templateBuildId: undefined,
}

const iState: DataState = {
    header: {
        imgUrl: {
            localImg: '',
            uploadImgUrl: '',
            storageId: '',
        },
        title: '',
    },
    sections: [],
    combos: Array.from({ length: 4 }, (_, i) => ({ description: '', imgUrl: [{ url: '', storageId: '' }], price: null, title: '', id: `combo ${i + 1}` })),
    contact: [],
    layout: {
        bgColor: '#ffffff',
        textsColor: '#000000',
        templateLayout: '',
        backgroundImg: {
            localImg: '',
            uploadImgUrl: '',
            storageId: '',
        },
    },
    paymentMethods: [],
    deliverMethods: [],
    cart: [],
    //
    widgets: [],
    orderWidgets: [],
    templateBuildId: undefined,
}

type PickOnly<T, K extends keyof T> =
    Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };

export const createDataStore = (
    initState: DataState,
) => {
    return createStore<DataStore>()((set) => ({
        ...initState,
        addSection: () => set((state) => ({
            sections: [...state.sections, {
                name: `section ${state.sections.length + 1}`, label: '', items: [{
                    name: 'Item 1',
                    price: null,
                    itemImage: {
                        localImg: '',
                        uploadImgUrl: '',
                        storageId: '',
                    },
                }]
            }]
        })),
        addItem: (section: string) => set((state) => {
            let pos = state.sections.map(e => e.name).indexOf(section)
            state.sections[pos].items.push({
                name: `Item ${state.sections[pos].items.length + 1}`,
                price: null,
                itemImage: {
                    localImg: '',
                    uploadImgUrl: '',
                    storageId: '',
                },
            })
            return { ...state }
        }),
        handleOnChangeSections: (event: ChangeEvent<HTMLInputElement>) => set((state) => {
            const { value, name } = event.target
            let pos = state.sections.map(e => e.name).indexOf(name)
            state.sections[pos].label = value
            return { ...state }
        }),
        handleOnChangeItems: (event: ChangeEvent<HTMLInputElement>, section: string, item: number, localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => set((state) => {
            let { value, name } = event.target
            let pos = state.sections.map(e => e.name).indexOf(section)
            if (name === 'itemImage') {
                if (localImg) state.sections[pos].items[item].itemImage.localImg = localImg
                if (uploadImgUrl && storageId) {
                    state.sections[pos].items[item].itemImage.uploadImgUrl = uploadImgUrl
                    state.sections[pos].items[item].itemImage.storageId = storageId
                }
            } else {
                state.sections[pos].items[item][name as keyof Omit<Items, "itemImage">] = value
            }
            return { ...state }
        }),
        handleOnChangeHeader: (event: ChangeEvent<HTMLInputElement>, localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => set((state) => {
            let { value, name } = event.target
            if (name === 'imgUrl') {
                if (localImg) state.header.imgUrl.localImg = localImg
                if (uploadImgUrl && storageId) {
                    state.header.imgUrl.uploadImgUrl = uploadImgUrl
                    state.header.imgUrl.storageId = storageId
                }
            } else {
                state.header.title = value
            }
            return { ...state }
            // return { ...state, header: { ...state.header, [name]: value } } No modifica template
        }),
        handleOnChangeCombos: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, combo: number, imgUrl?: string, imgUrlPos?: number, storageId?: Id<"_storage"> | string) => set((state) => {
            let { value, name } = event.target
            const { imgUrl: _imgUrl } = state.combos[combo]
            if (imgUrl) {
                const existImg = _imgUrl[imgUrlPos!]?.url
                // _imgUrl.splice(imgUrlPos!, 1, imgUrl)
                _imgUrl[imgUrlPos!].url = imgUrl
                _imgUrl[imgUrlPos!].storageId = storageId!
                if (_imgUrl.length < 5 && !existImg) {
                    _imgUrl.splice(imgUrlPos! + 1, 0, { url: '', storageId: '' })
                }
            } else {
                state.combos[combo][name as keyof Omit<Combos, "imgUrl">] = value
            }
            return { ...state }
        }),
        handleOnChangeContact: (event: ChangeEvent<HTMLInputElement>, iCName: string) => set((state) => {
            let { value } = event.target
            // state.contact[id] = state.contact[id] || {}
            // state.contact[id].url = value
            const { contact } = state
            const contactPos = contact.findIndex(c => c.title === iCName)
            const socialMedia = contact[contactPos]
            if (socialMedia) {
                socialMedia.url = value
            } else {
                contact.push({
                    enabled: true,
                    title: iCName,
                    url: value,
                })
            }
            return { ...state }
        }),
        handleOnChangeContactSwitch: (enabled: boolean = false, iCName: string) => set((state) => {
            const { contact } = state
            const contactPos = contact.findIndex(c => c.title === iCName)
            const socialMedia = contact[contactPos]
            if (socialMedia) {
                socialMedia.enabled = !enabled
                enabled && contact.splice(contactPos, 1)
            } else {
                contact.push({
                    enabled: true,
                    title: iCName,
                    url: '',
                })
            }
            return { ...state }
        }),
        handleOnChangeColorSwitch: () => set((state) => {
            let { textsColor } = state.layout
            if (textsColor === 'black') textsColor = 'white'
            else if (textsColor === 'white') textsColor = 'black'
            return { ...state, layout: { ...state.layout, textsColor } }
        }),
        handleOnChangeLayout: (color: string, type: Layout['textsColor'] | Layout['bgColor']) => set((state) => {
            state.layout[type as keyof Omit<Layout, "backgroundImg">] = color
            return { ...state }
        }),
        handleOnChangePM: (event: ChangeEvent<HTMLInputElement>, label: string) => set((state) => {
            let { value } = event.target
            const { paymentMethods } = state
            const paymentMethodPos = paymentMethods.findIndex(pm => pm.label === label)
            const paymentMethod = paymentMethods[paymentMethodPos]
            if (paymentMethod) {
                paymentMethod.comments = value
            } else {
                paymentMethods.push({
                    active: true,
                    label,
                    comments: value
                })
            }

            return { ...state }
        }),
        handleOnChangePMSwitch: (enabled: boolean = false, label: string) => set((state) => {
            const { paymentMethods } = state
            const paymentMethodPos = paymentMethods.findIndex(pm => pm.label === label)
            const paymentMethod = paymentMethods[paymentMethodPos]
            if (paymentMethod) {
                paymentMethod.active = !enabled
                enabled && paymentMethods.splice(paymentMethodPos, 1)
            } else {
                paymentMethods.push({
                    active: true,
                    label,
                    comments: ''
                })
            }
            return { ...state }
        }),
        handleOnChangeCart: (item: ItemCart) => set((state) => {
            state.cart.push(item)
            return { ...state }
        }),
        handleOnChangeCartQuantity: (item: ItemCart, type: string) => set((state) => {
            const cartItem = state.cart.find(i => i.category === item.category && i.label === item.label)!
            const cartItemPos = state.cart.findIndex(i => i.category === item.category && i.label === item.label)!
            switch (type) {
                case 'increase':
                    cartItem.quantity += 1
                    break;
                case 'decrease':
                    if (cartItem.quantity > 1) cartItem.quantity -= 1
                    else if (cartItem.quantity === 1) {
                        state.cart.splice(cartItemPos, 1)
                    }
                    break;
            }
            return { ...state }
        }),
        handleOnChangeDM: (event: ChangeEvent<HTMLInputElement>, label: string) => set((state) => {
            let { value } = event.target
            const { deliverMethods } = state
            const deliverMethodPos = deliverMethods.findIndex(pm => pm.label === label)
            const deliverMethod = deliverMethods[deliverMethodPos]
            if (deliverMethod) {
                deliverMethod.comments = value
            } else {
                deliverMethods.push({
                    active: true,
                    label,
                    comments: value
                })
            }
            return { ...state }
        }),
        handleOnChangeDMSwitch: (enabled: boolean = false, label: string) => set((state) => {
            const { deliverMethods } = state
            const deliverMethodPos = deliverMethods.findIndex(pm => pm.label === label)
            const deliverMethod = deliverMethods[deliverMethodPos]
            if (deliverMethod) {
                deliverMethod.active = !enabled
                enabled && deliverMethods.splice(deliverMethodPos, 1)
            } else {
                deliverMethods.push({
                    active: true,
                    label,
                    comments: ''
                })
            }
            return { ...state }
        }),
        deleteSection: (name: string) => set((state) => {
            const filterArr = state.sections.filter(s => s.name !== name).map(
                (s, i) => ({
                    ...s,
                    name: `section ${i + 1}`
                }))

            return { ...state, sections: filterArr }
        }),
        deleteItem: (section: string, item: number) => set((state) => {
            let pos = state.sections.map(e => e.name).indexOf(section)
            state.sections[pos].items.splice(item, 1)
            return { ...state }
        }),
        deleteImgHeader: () => set((state) => {
            return { ...state, header: { ...state.header, imgUrl: { localImg: '', uploadImgUrl: '', storageId: '' } } }
        }),
        deleteImgCombo: (combo: number, imgPos: number) => set((state) => {
            state.combos[combo].imgUrl.splice(imgPos, 1)
            return { ...state }
        }),
        setTemplateData: (data: DataState) => set(() => {
            return { ...data }
        }),
        resetState: () => set(() => {
            return iState
        }),
        addWidget: (widget: Widget) => set((state) => {
            let { widgets } = state
            switch (widget.widgetHandler) {
                case 'unique':
                    const exist = widgets.find(w => w.type === widget.type)
                    if (!exist) widgets.push({
                        ...widget,
                        enabled: true,
                        id: uuidv4(),
                    })
                    else {
                        let pos = widgets.findIndex(w => w.type === widget.type)
                        widgets.splice(pos, 1)
                    }
                    break;
                case 'multiple':
                    widgets.push({
                        ...widget,
                        id: uuidv4(),
                        data: { url: '', value: '' }
                    })
                    break;
                default:
                    break;
            }
            return { ...state }
        }),
        handleWidgetChanges: (widget: Widget, data: WidgetData) => set((state) => {
            const pos = state.widgets.findIndex(w => w.id === widget.id)
            state.widgets[pos].data = { ...state.widgets[pos].data, ...data }
            return { ...state }
        }),
        deleteWidget: (widget: Widget) => set((state) => {
            let pos = state.widgets.findIndex(w => w.id === widget.id)
            state.widgets.splice(pos, 1)
            return { ...state }
        }),
        updateWidgetOrder: (widgets: Widget[]) => set((state) => {
            return { ...state, widgets: widgets }
        }),
        addTemplateBuild: (id: Id<"templates">) => set((state) => {
            return { ...state, templateBuildId: id }
        }),
        handleOnChangeBgLayoutImg: (localImg?: string, uploadImgUrl?: string, storageId?: Id<"_storage">) => set((state) => {
            if (localImg) state.layout.backgroundImg.localImg = localImg
            if (uploadImgUrl && storageId) {
                state.layout.backgroundImg.uploadImgUrl = uploadImgUrl
                state.layout.backgroundImg.storageId = storageId
            }
            return { ...state }
        }),
        deleteBgLayoutImg: () => set((state) => {
            state.layout.backgroundImg.localImg = ''
            state.layout.backgroundImg.uploadImgUrl = ''
            state.layout.backgroundImg.storageId = ''
            return { ...state }
        }),
    }))
}

export const initDataStore = (): DataState => {
    return { ...defaultInitialState }
}
