import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'

type ItemCart = {
    label: string;
    price: number;
    quantity: number;
    category: string;
    id: string;
}

export type DataState = {
    cart: ItemCart[]
}

export type DataActions = {
    handleOnChangeCart: (item: ItemCart) => void,
    handleOnChangeCartQuantity: (item: ItemCart, type: string) => void,
    resetState: () => void,
}

export type DataStore = DataState & DataActions

export const defaultInitialState: DataState = {
    cart: [],
}

export const createDataStore = (
    initState: DataState = defaultInitialState,
) => {
    return createStore<DataStore>()(persist((set) => ({
        ...initState,
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
                    if (cartItem.quantity >= 1) {
                        cartItem.quantity -= 1
                        if (cartItem.quantity === 0) {
                            state.cart.splice(cartItemPos, 1)
                        }
                    }
                    break;
            }
            return { ...state }
        }),
        resetState: () => {
            set(initState)
        },
    }), { name: 'cart', storage: createJSONStorage(() => sessionStorage) }
    ))
}

export const initDataStore = (): DataState => {
    return { ...defaultInitialState }
}
