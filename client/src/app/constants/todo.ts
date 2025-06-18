export const POST_TODO = {
    FIELDS: ["title"],
    MESSAGE: {
        title: {
            required: "TODOを入力してください",
        }
    },
    RULES: {
        title: {
            required: true,
        }
    }
};