"use client";

import {
  useGetBooksQuery,
  useCreateBookMutation,
  useRemoveBookMutation,
  Book,
  useUpdateBookMutation,
} from "../generated/graphql";
import { Button, Descriptions, Popconfirm, Space, Table } from "antd";
import type { DescriptionsProps, TableProps } from "antd";
import ButtonActiveModal from "./ButtonActiveModal";
import BookForm from "./BookForm";
import { FC, useState } from "react";

const BookDetail: FC<{ book: Book }> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hiddenModal = () => {
    setIsModalOpen(false);
  };

  const items: DescriptionsProps["items"] = [];

  for (const key in book) {
    items.push({
      label: key,
      key: key,
      children: book[key as keyof Book],
    });
  }

  return (
    <ButtonActiveModal
      showModal={showModal}
      hiddenModal={hiddenModal}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      buttonText="Detail"
      buttonType="link"
      title={"Book Detail"}
      footer={null}
    >
      <Descriptions items={items} />
    </ButtonActiveModal>
  );
};

const UpdateBook: FC<{ book: Book; onUpdatedFinish: (values: Book) => void }> = ({ book, onUpdatedFinish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hiddenModal = () => {
    setIsModalOpen(false);
  };

  const onFinished = (values: Book) => {
    onUpdatedFinish(values);
    hiddenModal();
  };

  return (
    <ButtonActiveModal
      showModal={showModal}
      hiddenModal={hiddenModal}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title="Update Book"
      buttonText="Update"
      buttonType="link"
      footer={null}
    >
      <BookForm onFinish={onFinished} value={book} />
    </ButtonActiveModal>
  );
};

const BooksTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useGetBooksQuery();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [removebook] = useRemoveBookMutation();

  const columns: TableProps<Book>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Isbn",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BookDetail book={record} />
          <UpdateBook book={record} onUpdatedFinish={onUpdatedFinish} />
          <Popconfirm
              title="Delete the book"
              description="Are you sure to delete this book?"
              onConfirm={() => onRemovedFinish(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onCreatedFinish = (values: Book) => {
    createBook({
      variables: {
        createBookInput: values,
      },
      refetchQueries: ["GetBooks"],
    });
    hiddenModal();
  };

  const onUpdatedFinish = (values: Book) => {
    updateBook({
      variables: {
        updateBookInput: values,
      },
      refetchQueries: ["GetBooks"],
    });
  };

  const onRemovedFinish = (id: number) => {
    removebook({
      variables: {
        id: id,
      },
      refetchQueries: ["GetBooks"],
    });
    hiddenModal();
  };

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hiddenModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ButtonActiveModal
        showModal={showModal}
        hiddenModal={hiddenModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Create Book"
        buttonText="Create Book"
        footer={null}
      >
        <BookForm onFinish={onCreatedFinish} />
      </ButtonActiveModal>
      <Table columns={columns} dataSource={data?.books || []} />
    </div>
  );
};

export default BooksTable;
