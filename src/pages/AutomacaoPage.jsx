import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function AutomacaoPage() {
    const [file, setFile] = useState(null);
    const [senha, setSenha] = useState("");
    const [usuario, setUsuario] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("Selecione um arquivo primeiro.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://codedeving.com.br/api/planilha/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadStatus(response.data);
        } catch (error) {
            setUploadStatus("Erro ao enviar arquivo.");
        }
    };

    const handleExecutarAutomacao1 = async () => {
        try {
            const response = await axios.post("http://codedeving.com.br/api/automacaoCorban/executar", null, {
                params: { caminhoPlanilha: `uploads/${file?.name}` },
            });
            setUploadStatus(response.data);
        } catch (error) {
            setUploadStatus("Erro ao executar automação.");
        }
    };

    const handleExecutarAutomacao = async () => {
        const formData = new URLSearchParams();
        formData.append("caminhoPlanilha", `uploads/${file?.name}`);
        formData.append("usuario", usuario);
        formData.append("senha", senha);

        try {
            const response = await axios.post(
                "http://codedeving.com.br/api/automacaoCorban/executar",
                formData, // Enviando o formData corretamente
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );
            setUploadStatus(response.data);
        } catch (error) {
            setUploadStatus("Erro ao executar automação.");
        }
    };


    const handleDownload = async () => {
        try {
            if (!file?.name) {
                console.error("Nome do arquivo não foi definido!");
                return;
            }

            console.log(`Baixando arquivo: ${file.name}`);

            const response = await axios.get(`http://codedeving.com.br/api/planilha/download/${file.name}`, {
                responseType: "blob",
            });

            console.log("Resposta:", response);

            if (!response.data) {
                console.error("Erro: resposta vazia.");
                return;
            }

            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Erro ao baixar o arquivo:", error);
            setUploadStatus("Erro ao baixar o arquivo.");
        }
    };

    return (
        <div className="flex flex-col items-center p-8">
            <div className="w-full max-w-md shadow-lg rounded-lg bg-white p-6">
                <h2 className="text-xl font-semibold text-center mb-4">Automação Corban</h2>

                <br /><br />

                {/* Upload de Arquivo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        1- Selecione a planilha: <span className="text-gray-500"></span>
                    </label>
                    <input type="file" onChange={handleFileChange} className="border p-2 w-full rounded-md" />
                </div>
                <br />

                {/* Botões de Upload e Download */}
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium"> 2 - </label>
                    <button
                        onClick={handleUpload}
                        className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
                    >
                        <span role="img" aria-label="upload-icon">📤</span> Upload <span className="text-gray-500"></span>
                    </button>
                </div>

                <br /><br />

                {/* Campos de Usuário e Senha + Botão Executar */}
                <div className="p-4 bg-gray-100 rounded-md mb-4">
                    <label className="block text-sm font-medium mb-1">
                        3 - Usuário: <span className="text-gray-500"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="border p-2 w-full rounded-md mb-2"
                    />

                    <label className="block text-sm font-medium mb-1">
                        Senha: <span className="text-gray-500"></span>
                    </label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="border p-2 w-full rounded-md mb-2"
                    />
                    <br /><br />
                    <label className="block text-sm font-medium"> 4 - </label>
                    <button
                        onClick={handleExecutarAutomacao}
                        disabled={!file || !usuario || !senha}
                        className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                        <span role="img" aria-label="play-icon">▶️</span> Executar Automação <span className="text-gray-500"></span>
                    </button>
                </div>

                <br /><br />
                <label className="block text-sm font-medium"> 5 - Após concluir Automação </label>
                <button
                    onClick={handleDownload}
                    disabled={!file}
                    className="w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                    <span role="img" aria-label="download-icon">📥</span> Baixar Arquivo <span className="text-gray-500"></span>
                </button>

                {/* Status da Automação */}
                {uploadStatus && (
    <p className="text-center text-sm text-gray-700 bg-blue-200 p-2 mt-4 rounded-md">
        {uploadStatus}
    </p>
)}
                <br /><br /> <br /><br />
                <div className="w-full text-center text-xs text-gray-600 mt-8 py-3 border-t border-gray-200 bg-gray-50">
                    <span className="font-light tracking-wide">
                        Desenvolvido por: Juliana Souza
                    </span>
                </div>
            </div>
        </div>
    );
}