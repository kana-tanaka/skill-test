"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useCategoryContext } from '../contexts/CategoryContext';
import Loading from './Loading';
import { useSelectedCategoryContext } from '../contexts/SelectedCategoryContext';
import { useRouter } from 'next/navigation';
import { ALL_CATEGORY, ALL_CATEGORY_EVENT_KEY } from '../constants/message';

const Header = () => {
    // コンテクストからTodoリストドロップダウンに表示するカテゴリー一覧を取得
    const { categories, loading, error } = useCategoryContext();
    const router = useRouter();

    // カテゴリー一覧から選択されたカテゴリーのidをコンテクストに保存する
    const { selectedCategory, setSelectedCategory } = useSelectedCategoryContext();
    const handleSelect = (eventKey: string | null) => {
        // ALLが選択された場合
        if(eventKey === ALL_CATEGORY_EVENT_KEY) {
            setSelectedCategory(ALL_CATEGORY);
            return;
        }

        const selected = categories.find(category => category.id === Number(eventKey));
        if(selected) {
            setSelectedCategory(selected);
            router.push('/todo-list');
        }
    };

    return (
        <>
            {loading && <Loading />}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Todo List</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                                Todo List
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={ALL_CATEGORY_EVENT_KEY}>
                                    All
                                </Dropdown.Item>
                                {categories.map((category) => (
                                    <Dropdown.Item
                                        key={category.id}
                                        eventKey={String(category.id)}
                                    >
                                        {category.title}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                                Category
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href='/add-category' eventKey="Add Category">Add Category</Dropdown.Item>
                                <Dropdown.Item href="/edit-category" eventKey="Edit Category">Edit Category</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;