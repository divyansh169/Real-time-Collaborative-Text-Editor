import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import DocumentPill from '../components/view/DocumentPill';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import CreateDoc from '../components/view/CreateDoc';
import NavBar from "../components/NavBar/NavBar.jsx";
import { useNavigate } from "react-router-dom";

export default function View() {
    const [selected, setSelected] = useState('owned by anyone');
    const [docs, setDocs] = useState([]);
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetch('http://localhost:3000/api/docs/all', {
            headers: {
                "Authorization": localStorage.getItem('jwtKey')
            }
        })
        .then(res => res.json())
        .then(data => {
            setDocs(data);
            console.log(data);
            setLoading(false);
        })
        .catch(() => {
            navigate('/');
        });
    }, []);

    return (
        <>
            <NavBar title='Collab' signedin={!loading} setsignedin={setLoading} />
            <div className="bg-[#f1f3f4] flex flex-col justify-top items-center p-4 min-h-screen">
                <div className="flex justify-between items-center p-4 w-10/12">
                    <div className="mr-auto">
                        <h1 className="text-[#5f6368] font-['Product_sans'] text-2xl">
                            My Collab Files
                        </h1>
                    </div>
                    <Listbox as='div' className="ml-auto" value={selected} onChange={setSelected}>
                        <Listbox.Button className="bg-white pl-4 pr-3 py-2 rounded-lg">
                            <span className="text-[#5f6368] font-['Product_sans'] text-lg">{selected}</span>
                            <ArrowDropDownRoundedIcon sx={{ color: '#5f6368', marginLeft: 1, fontSize: 33 }} />
                        </Listbox.Button>
                        <Listbox.Options className="text-[#5f6368] font-['Product_sans'] absolute z-10 mt-2 w-48 p-2 bg-white rounded-md text-md">
                            <Listbox.Option value="owned by anyone"
                                className="rounded-md cursor-pointer p-2 hover:bg-gray-200">Owned by
                                anyone</Listbox.Option>
                            <Listbox.Option value="owned by me"
                                className="rounded-md cursor-pointer p-2 hover:bg-gray-200">Owned
                                by me</Listbox.Option>
                            <Listbox.Option value="shared with me"
                                className="rounded-md cursor-pointer p-2 hover:bg-gray-200">Shared
                                with me</Listbox.Option>
                        </Listbox.Options>
                    </Listbox>
                </div>

                {docs.map((file) => {
                    if (selected === 'owned by me' && file.owner !== username) return null;
                    if (selected === 'shared with me' && !file.sharedWith.some(shared => shared.username === username)) return null;
                    return <DocumentPill key={file.id} file={file} files={docs} setFiles={setDocs} />;
                })}
                {docs.length === 0 && <div className="w-10/12 bg-white p-4 rounded-lg">
                    <h1 className="text-[#5f6368] font-['Product_sans'] text-xl font-bold text-center">No documents
                        here</h1>
                </div>}
                <button
                    onClick={() => setCreate(true)}
                    className="bg-white fixed right-8 bottom-8 text-white rounded-full w-14 h-14 flex justify-center items-center overflow-hidden">
                    <span className="text-3xl text-black">+</span>
                </button>
                <CreateDoc open={create} setOpen={setCreate} files={docs} setFiles={setDocs} />
            </div>
        </>
    );
}
