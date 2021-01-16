import React, { useEffect, useState } from "react";
import { GET_POSTS, ADD_POST } from "../config/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Navbar, Card, Footer } from "../components/index";
import { Icon, InlineIcon } from "@iconify/react";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import rightOutlined from "@iconify/icons-ant-design/right-outlined";
import xIcon from "@iconify/icons-heroicons-solid/x";
import dot_background from "../assets/images/dot_background.png";
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

function MainPage() {
  var subtitle;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

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
    createPost,
    { loading: loadingAdd, error: errorAdd, data: dataCreate },
  ] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  function submitPost(e) {
    e.preventDefault();
    const payload = {
      title: title,
      body: body,
    };
    console.log(payload);
    createPost({
      variables: {
        input: payload,
      },
    }).finally(() => {
      setIsOpen(false);
    });
  }

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS);
  console.log(posts, data, "<========== ini dataPost");
  console.log(dataCreate, "<================== ini data crete");

  useEffect(() => {
    if (data) {
      setPosts(data.posts.data);
      // setTotalCount(data.posts.meta.totalCount);
    }
  }, [data]);

  // if (loading) return <div>Loading...</div>;
  if (error) return `Error! `;
  return (
    <section>
      <Navbar />
      <div className="content">
        <div className="textHeader">
          <div className="fix">
            <h1>
              Share Your
              <br />
              Fantastic Stories
            </h1>
            <div className="btnCreate" onClick={openModal}>
              <Icon icon={plusCircleOutlined} className="iconPlus" />
              <p>Create</p>
            </div>
            <div className="btnCreateRespon" onClick={openModal}>
              <Icon icon={plusCircleOutlined} className="iconPlus" />
            </div>
          </div>
        </div>
        <div className="blogContent">
          {loading ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              Loading...
            </div>
          ) : (
            posts.map((post) => {
              return <Card key={post.id} post={post} />;
            })
          )}
        </div>
        {/* <button onClick={() => fetchMoreData()}>
          More <Icon icon={rightOutlined} className="rightIcon" />
        </button> */}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modalHeader">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Write Your Magical Story
          </h2>
          <button onClick={closeModal}>
            <Icon icon={xIcon} />
          </button>
        </div>

        <form onSubmit={(e) => submitPost(e)} className="modalContent">
          <p>Title:</p>
          <input
            onChange={(e) => onChangeTitle(e)}
            placeholder="Put interesting title here.."
          />
          <p>Story:</p>
          <textarea
            onChange={(e) => onChangeBody(e)}
            placeholder="Share it away :).."
          />
          <button>
            <Icon icon={plusCircleOutlined} className="iconPlus" />
            {loadingAdd ? (
              <div>loading</div>
            ) : (
              <div className="btn-modal-text"> Create</div>
            )}
          </button>
        </form>
      </Modal>

      <Footer />

      <div className="backLeft">
        <img className="imgBack" src={dot_background} alt="" />
      </div>
    </section>
  );
}

export default MainPage;
