import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Book } from '@/generated/graphql';

type BookFormProps = {
    value?: Book;
    onFinish: (values: Book) => void;
};

const BookForm: FC<BookFormProps> = (props) => {
    const { value, onFinish } = props;
    const [form] = Form.useForm();

    return (
        <Form<Book>
            layout='vertical'
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            initialValues={value}
            style={{
                maxWidth: 600,
            }}
            >
            <Form.Item<Book>
                name="id"
                label="Id"
                hidden={true}
            >
                <Input />
            </Form.Item>
            <Form.Item<Book>
                name="title"
                label="Title"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Book>
                name="author"
                label="Author"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Book>
                name="isbn"
                label="Isbn"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookForm;