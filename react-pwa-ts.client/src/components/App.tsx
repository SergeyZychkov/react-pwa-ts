import { useState } from 'react';
import './App.css';
import TabButton from './TabButton';
import GlobalStore from './GlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App() {
    const [selectedTopic, setSelectedTopic] = useState<string>();
    const [showStore, setShowStore] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleSelect(selectedButton: string) {
        setSelectedTopic(selectedButton);
        navigate(selectedButton);
    }

    let globalStore: JSX.Element | string = "";

    if (showStore) {

        globalStore = <GlobalStore></GlobalStore>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <h3 id="tabelLabel">React PWA</h3>
                {selectedTopic ? undefined : <h5 id="selectTabHeader"><p>Please click any button below.</p></h5>} 
                <section id="examples">
                    <menu>
                        <TabButton
                            isSelected={selectedTopic === 'API'}
                            onSelect={() => handleSelect('integration')}
                        >
                            API integration/MUI/MUI-X 
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'Content'}
                            onSelect={() => handleSelect('content')}
                        >
                            Upload content
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'Mobile'}
                            onSelect={() => handleSelect('mobile')}
                        >
                            Geolocation and PUSH notifications
                        </TabButton>
                    </menu>
                    <Outlet />
                </section>

                <button onClick={() => setShowStore(!showStore)}>{showStore ? "Hide" : "Show"} global store</button>

                {globalStore}
                
                <p>Also you can test following features:
                    <br/>- installable PWA
                    
                    <br/>-Also, there are library to generate and scan QR code for react. 
                        For example, <a href="https://www.npmjs.com/package/qr-scanner">qr-scanner</a>
                        <br/><a href="https://www.npmjs.com/package/react-qr-code">react-qr-code</a>
                </p>
            </div>
        </QueryClientProvider>
    );
};