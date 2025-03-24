import { atom, selector } from "recoil";

export const enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "uniqueCategoryState",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const toDoKey = "ToDo";
      const savevalue = localStorage.getItem(toDoKey);
      if (savevalue !== null) {
        setSelf(JSON.parse(savevalue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(toDoKey)
          : localStorage.setItem(toDoKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
