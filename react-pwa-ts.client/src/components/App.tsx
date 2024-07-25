import { useState } from 'react';
import './App.css';
import TabButton from './TabButton';
import ApiIntegration from './ApiIntegration';
import UploadContent from './UploadContent';
import Mobile from './Mobile';
import GlobalStore from './GlobalStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function App() {
    const [selectedTopic, setSelectedTopic] = useState<string>();
    const [showStore, setShowStore] = useState<boolean>(false);

    function handleSelect(selectedButton: string) {
        setSelectedTopic(selectedButton);
    }

    let tabContent: JSX.Element | string = "";
    let globalStore: JSX.Element | string = "";

    if (showStore) {

        globalStore = <GlobalStore></GlobalStore>;
    }
    
    if (selectedTopic) {

        if(selectedTopic === 'API')
            tabContent = <ApiIntegration></ApiIntegration>;
        else if(selectedTopic === 'Content')
            tabContent = <UploadContent></UploadContent>;
        else if(selectedTopic === 'Mobile')
            tabContent = <Mobile></Mobile>;
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
                            onSelect={() => handleSelect('API')}
                        >
                            API integration
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'Content'}
                            onSelect={() => handleSelect('Content')}
                        >
                            Upload content
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'Mobile'}
                            onSelect={() => handleSelect('Mobile')}
                        >
                            Geolocation and PUSH notifications
                        </TabButton>
                    </menu>
                    {tabContent}
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