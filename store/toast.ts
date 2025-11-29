import { create } from 'zustand'

interface ToastInterface {
  show: boolean,
  title: string,
  message: string,
  setToast: ({
    title,
    message
  }:{
    title: string,
    message: string
  }) => void
}

const useToast = create<ToastInterface>((set, get) => ({
  show: false,
  title: "",
  message: "",
  setToast: (
    {
    title="Error",
    message=""
  }:{
    title?: string,
    message?: string
  }
  ) => {
    set({
      show: true,
      title,
      message
    })

    setTimeout(() => {
      set({
        show: false
      })
    }, 3000)
  },
}));

export {
    useToast
}
