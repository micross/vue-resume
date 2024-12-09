type Sheet = {
  open: boolean;
 // setOpen: (open: boolean) => void;
};

type Panel = {
  size: number;
  setSize: (size: number) => void;
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
};

type SheetState = {
  left: Sheet;
  right: Sheet;
};

type PanelState = {
  left: Panel;
  middle: Panel;
  right: Panel;
};

export const useBuilderStore = defineStore(
  'builder',
  () => {
    const sheet = ref({
      left: {
        open: false,
      },
      right: {
        open: false,
      }
    } as SheetState);

    const toggle = (side: "left" | "right") => {
      sheet.value[side].open = !sheet.value[side].open;
    }

    const setPanelSize = (side: "left" | "middle" | "right", size: number) => {
      panel.value[side].size = size;
    }
    const setDragging = (side: "left" | "middle" | "right", dragging: boolean) => {
      panel.value[side].isDragging = dragging;
    }

    const panel = ref({
      left: {
        open: false,
        size: 0,
        isDragging: false,
        setSize(size: number) {
          setPanelSize('left', size)
        },
        setDragging(dragging: boolean) {
          setDragging('left', dragging);
        }
      },
      middle: {
        open: false,
        size: 0,
        isDragging: false,
        setSize(size: number) {
          setPanelSize('middle', size)
        },
        setDragging(dragging: boolean) {
          setDragging('middle', dragging);
        }
      },
      right: {
        open: false,
        size: 0,
        isDragging: false,
        setSize(size: number) {
          setPanelSize('right', size)
        },
        setDragging(dragging: boolean) {
          setDragging('right', dragging);
        }
      }
    } as PanelState);

    return { sheet, toggle, panel, setPanelSize, setDragging }
  },
  {
    persist: true,
  }
);
