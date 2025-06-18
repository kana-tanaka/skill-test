export const CATEGORY = {
    FIELDS: ["title", "description", "color"],
    MESSAGE: {
        title: {
            required: "カテゴリー名は必須です",
        },
        color: {
            required: "カテゴリーの色は必須です",
            pattern: "正しいカラーコードを入力してください（例: #FFFFFF）"
        }
    },
    RULES: {
        title: {
            required: true,
        },
        description: {
            required: false,
        },
        color: {
            required: true,
            pattern: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
        }
    }
};