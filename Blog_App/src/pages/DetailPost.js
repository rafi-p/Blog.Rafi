import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components/index";
import {
  GET_POST,
  UPDATE_POST,
  GET_POSTS,
  DELETE_POST,
} from "../config/queries";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Icon, InlineIcon } from "@iconify/react";
import xIcon from "@iconify/icons-heroicons-solid/x";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "420px",
  },
};

function DetailPost() {
  var subtitle;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { id: id },
  });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onChangeTitle(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function onChangeBody(e) {
    e.preventDefault();
    setBody(e.target.value);
  }

  const [
    updatePost,
    { loading: loadingEdit, error: errorEdit, data: dataEdit },
  ] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [
    deletePost,
    { loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  function submitPost(e) {
    e.preventDefault();
    const payload = {
      title: title,
      body: body,
    };
    console.log(payload);
    updatePost({
      variables: {
        id: id,
        input: payload,
      },
    }).finally(() => {
      setIsOpen(false);
      refetch();
    });
  }
  console.log(dataEdit);

  function onDelete() {
    deletePost({
      variables: {
        id: id,
      },
    }).finally(() => {
      history.push(`/`);
    });
  }

  useEffect(() => {
    if (data) {
      setPost(data.post);
      // setTotalCount(data.posts.meta.totalCount);
    }
  }, [data]);

  console.log(
    post,
    "################################# ini data post",
    id,
    "################ ini id"
  );
  if (loading)
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  return (
    <section>
      <Navbar />
      <div className="contentDetail">
        <h2>{post.title}</h2>
        <ul>
          <li>
            <div onClick={openModal}>Edit</div>
            <p>|</p>
            <div onClick={() => onDelete()}>
              {loadingDelete ? <div>Loading</div> : "Delete"}
            </div>
          </li>
        </ul>
        <div>{post.body}</div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modalHeader">
          <h2 id="modalDetailTitle" ref={(_subtitle) => (subtitle = _subtitle)}>
            Need a Revision?
          </h2>
          <button onClick={closeModal}>
            <Icon icon={xIcon} />
          </button>
        </div>

        <form onSubmit={(e) => submitPost(e)} className="modalContent">
          <p>Title:</p>
          <input
            onChange={(e) => onChangeTitle(e)}
            defaultValue={post.title}
            placeholder="Put interesting title here.."
            style={{ background: "#fff" }}
            disabled
          />
          <p>Story:</p>
          <textarea
            onChange={(e) => onChangeBody(e)}
            defaultValue={post.body}
            placeholder="Share it away :).."
          />
          <button>
            <Icon icon={plusCircleOutlined} className="iconPlus" />
            {loadingEdit ? (
              <div>Loading</div>
            ) : (
              <div className="btn-modal-text">Edit</div>
            )}
          </button>
        </form>
      </Modal>
      <Footer />
    </section>
  );
}

export default DetailPost;
