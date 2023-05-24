import styles from "/styles/Home.module.scss";
import { TableHeading } from "../helper/sampleText";
import { useEffect, useState, useRef } from "react";
import { getTableList, updateTableList } from "./api/NetworkApi";
import { Loader } from "/components/unit/Loader";
import { ConfirmModal } from "../helper/ConfirmModal";
import PaginationWidget from "/components/widget/PaginationWidget";
import { Search } from "/components/unit/Search";
import { useRouter } from "next/router";
import DownArrow from "../components/unit/DownArrow";
import UpArrow from "../components/unit/UpArrow";

export default function Home({ apiURL }) {
  const [tbody, setTbody] = useState();
  const [token, setToken] = useState();
  const [confirmModalCall, setConfirmModalCall] = useState(false);
  const [dataId, setDataId] = useState();
  const [isAllowed, setIsAllowed] = useState();
  const [theading, setTheading] = useState();
  const [dataChanged, setDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState("first_name");
  const [order, setOrder] = useState({ first_name: "ASC" });
  const [searchTerm, setSearchTerm] = useState("");
  const totalItems = useRef();
  const router = useRouter();

  const getTableData = async () => {
    // send Api Url in params to table list api
    setIsLoading(true);

    const response = await getTableList(
      `${apiURL}/getUsers?page=${pageNo}&pagesize=${itemsPerPage}&sortkey=${sortKey}&order=${order[sortKey]}&searchterm=${searchTerm}`
    );
    if (response.statusCode === 401) {
      localStorage.clear();
      router.push("/login");
    } else {
      // response.data = response?.data?.rows.sort(
      //   (a, b) => parseFloat(a.id) - parseFloat(b.id)
      // );
      totalItems.current = response.data.response.count;
      setTbody(response.data.response.rows);
      if (searchTerm) {
        response.data.response.rows.map((data, index) => {
          if (data.user.passify_id.includes(searchTerm)) {
            data.user.searchMatchID = true;
          } else if (
            data.user.first_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            data.user.searchMatchFirstName = true;
          } else if (
            data.user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            data.user.searchMatchLastName = true;
          }
        });
      }
      // setTbody(
      //   response?.data.slice((pageNo - 1) * itemsPerPage, pageNo * itemsPerPage)
      // );
    }
    setIsLoading(false);
  };
  const updateStatus = async (id, status) => {
    const obj = {
      user_id: parseInt(id),
      is_allowed: status,
    };
    setConfirmModalCall(false);
    setIsLoading(true);
    const respone = await updateTableList(
      `${apiURL}terminalAccess/updateTerminalAccess`,
      obj,
      token
    );
    if (respone) setDataChanged(!dataChanged);
    setIsLoading(false);
  };

  useEffect(() => {
    //Table Heading
    setTheading(TableHeading);
    setTbody(null);
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      getTableData();
      // searchTerm && searchedWordsHighlight(searchTerm);
    } else router.push("/login");
  }, [dataChanged, token, itemsPerPage, pageNo, order, searchTerm]);

  // useEffect(() => {
  //   setTbody(data?.slice((pageNo - 1) * itemsPerPage, pageNo * itemsPerPage));
  // }, [pageNo, data, itemsPerPage]);
  return (
    <>
      <div className={styles.container}>
        {confirmModalCall && (
          <ConfirmModal
            onConfirm={() => updateStatus(dataId, isAllowed)}
            ban={isAllowed}
            onCancel={() => setConfirmModalCall(false)}
            message={
              isAllowed
                ? "Are you sure you want to unban this User?"
                : "Are you sure you want to ban this User?"
            }
          />
        )}
        {isLoading && <Loader />}
        <div className={styles.contentContainer}>
          <div className={styles.terminalHeader}>
            <p className={styles.driversCount}>
              {totalItems.current} Authorized Users
            </p>
            <div style={{ width: "20rem", padding: "1rem" }} title="Search">
              <Search setSearchTerm={setSearchTerm} placeholder="Search" />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                {theading?.map((data, index) => (
                  <th className={styles.column} key={index}>
                    <span className={styles.columnHeader}>
                      {data.value}
                      {data.sortable && (
                        <span className={styles.sortIcon}>
                          {order[data.id] === "ASC" ? (
                            <UpArrow
                              color="#599522"
                              strokeWidth={2.8}
                              onClick={() => {
                                setSortKey(data.id);
                                setOrder({ [data.id]: "ASC" });
                              }}
                            />
                          ) : (
                            <UpArrow
                              onClick={() => {
                                setSortKey(data.id);
                                setOrder({ [data.id]: "ASC" });
                              }}
                            />
                          )}

                          {order[data.id] === "DESC" ? (
                            <DownArrow
                              color="#599522"
                              strokeWidth={2.8}
                              onClick={() => {
                                setSortKey(data.id);
                                setOrder({ [data.id]: "DESC" });
                              }}
                            />
                          ) : (
                            <DownArrow
                              onClick={() => {
                                setSortKey(data.id);
                                setOrder({ [data.id]: "DESC" });
                              }}
                            />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbody?.map((data, index) => (
                <tr key={index} className={styles.row}>
                  <td
                    className="searchable"
                    style={
                      data.user.searchMatchID
                        ? { backgroundColor: "#599522", color: "#fff" }
                        : {}
                    }
                  >
                    {data.user.passify_id}
                  </td>
                  <td
                    className="searchable"
                    style={
                      data.user.searchMatchFirstName
                        ? { backgroundColor: "#599522", color: "#fff" }
                        : {}
                    }
                  >
                    {data.user.first_name}
                  </td>
                  <td
                    className="searchable"
                    style={
                      data.user.searchMatchLastName
                        ? { backgroundColor: "#599522", color: "#fff" }
                        : {}
                    }
                  >
                    {data.user.last_name}
                  </td>
                  <td>{data.user.email}</td>
                  <td>{data.user.phone}</td>
                  <td>{data.is_allowed ? "Ok" : "Banned"}</td>
                  <td>
                    <button
                      className={`${styles.btn} ${
                        data.is_allowed === true
                          ? styles.banBtn
                          : styles.unbanBtn
                      }`}
                      onClick={() => {
                        setConfirmModalCall(true);
                        setDataId(data.user.id),
                          setIsAllowed(data.is_allowed === true ? false : true);
                      }}
                    >
                      {data.is_allowed === true ? "Ban" : "UnBan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationWidget
            pageNumber={pageNo}
            setPageNumber={setPageNo}
            itemsPerPage={itemsPerPage}
            setItemPerPage={setItemsPerPage}
            itemCount={itemsPerPage}
            totalCountUI={false}
            totalItems={totalItems.current}
            totalPages={Math.ceil(totalItems.current / itemsPerPage)}
          />
        </div>
      </div>
    </>
  );
}
export async function getStaticProps(context) {
  const apiURL = process.env.API_URL;
  return {
    props: {
      apiURL,
    },
  };
}
