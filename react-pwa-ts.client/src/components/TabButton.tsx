interface IProps {
    children: React.ReactNode,
    onSelect?: React.MouseEventHandler<HTMLButtonElement>,
    isSelected?: boolean;
}

export default function TabButton({ children, onSelect, isSelected }: IProps) {
    return (
        <li>
            <button className={isSelected ? 'active' : undefined} onClick={onSelect}>
                {children}
            </button>
        </li>
    );
}