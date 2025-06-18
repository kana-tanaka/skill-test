import { CATEGORY } from "./category";

export const ERROR_MESSAGES = {
    CATEGORY: {
        ADD: "カテゴリーの追加に失敗しました",
        EDIT: "カテゴリーの編集に失敗しました",
        DELETE: "カテゴリーの削除に失敗しました",
        FETCH: "カテゴリーの取得に失敗しました",
    },
    TODO: {
        ADD: "TODOの追加に失敗しました",
        EDIT: "TODOの編集に失敗しました",
        DELETE: "TODOの削除に失敗しました",
        FETCH: "TODOの取得に失敗しました",
    }
}

export const SUCCESS_MESSAGES = {
    CATEGORY: {
        ADD: "カテゴリーの追加に成功しました",
        EDIT: "カテゴリーの編集に成功しました",
        DELETE: "カテゴリーの削除に成功しました",
    },
    TODO: {
        ADD: "TODOの追加に成功しました",
        EDIT: "TODOの編集に成功しました",
        DELETE: "TODOの削除に成功しました",
        FETCH: "TODOの取得に成功しました",
    }
}

export const ALL_CATEGORY_EVENT_KEY = "0";

export const ALL_CATEGORY = {
    id: 0,
    title: "ALL",
    description: "",
    color: "#000000"
}