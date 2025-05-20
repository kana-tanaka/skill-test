"use client";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => React.Key;
    handleDoubleClick?: (item: T) => void;
}

const List = <T,>({ items, renderItem, keyExtractor, handleDoubleClick }: ListProps<T>) => {
    return (
        <ul>
            {items.map((item) => (
                <li
                    key={keyExtractor(item)}
                    onDoubleClick={handleDoubleClick ? () => handleDoubleClick(item) : undefined}
                >
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
};

export default List;