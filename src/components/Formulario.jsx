import { useMemo, useState } from "react"

function Form() {
    const [tab, setTab] = useState("cadastro")
    const [showCadastroSenha, setShowCadastroSenha] = useState(false)
    const [showLoginSenha, setShowLoginSenha] = useState(false)
    const [showSenhaInfo, setShowSenhaInfo] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    const [cadastro, setCadastro] = useState({
        email: "",
        senha: "",
        cpf: ""
    })

    const [login, setLogin] = useState({
        email: "",
        senha: ""
    })

    const rules = useMemo(() => {
        const senha = cadastro.senha
        return {
            min: senha.length >= 8,
            upper: /[A-Z]/.test(senha),
            lower: /[a-z]/.test(senha),
            number: /[0-9]/.test(senha),
            special: /[@$!%*?&#]/.test(senha)
        }
    }, [cadastro.senha])

    function handleCadastroSubmit(event) {
        event.preventDefault()

        if (!rules.min || !rules.upper || !rules.lower || !rules.number || !rules.special) {
            setMessage({ text: "Senha invalida. Revise os requisitos.", type: "error" })
            return
        }

        setMessage({ text: "Cadastro realizado com sucesso!", type: "success" })
        setCadastro({ email: "", senha: "", cpf: "" })
    }

    function handleLoginSubmit(event) {
        event.preventDefault()
        setMessage({ text: "Login realizado com sucesso!", type: "success" })
        setLogin({ email: "", senha: "" })
    }

    function ruleStyle(isValid) {
        return {
            color: isValid ? "green" : "",
            fontWeight: isValid ? "bolder" : ""
        }
    }

    return (
        <div>
            <div className="container">
                <h2>Sistema de Cadastro e Login</h2>

                <div className="tabs">
                    <button type="button" className={`tab ${tab === "cadastro" ? "active" : ""}`} onClick={() => setTab("cadastro")}>Cadastro</button>
                    <button type="button" className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Login</button>
                </div>

                <div className={`form-section ${tab === "cadastro" ? "active" : ""}`}>
                    <form onSubmit={handleCadastroSubmit}>
                        <div className="form-group">
                            <label htmlFor="cadastroEmail">Email:</label>
                            <input
                                type="email"
                                id="cadastroEmail"
                                placeholder="exemplo@email.com"
                                required
                                value={cadastro.email}
                                onChange={(e) => setCadastro((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className="form-group" style={{ position: "relative" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                                <label htmlFor="cadastroSenha" style={{ marginBottom: 0 }}>Senha:</label>
                                <button
                                    type="button"
                                    onClick={() => setShowSenhaInfo((prev) => !prev)}
                                    aria-label="Mostrar requisitos da senha"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "50%",
                                        border: "1px solid #667eea",
                                        color: "#667eea",
                                        background: "#fff",
                                        cursor: "pointer",
                                        fontWeight: "bolder",
                                        padding: 0,
                                        marginTop: 0,
                                        fontSize: 14,
                                        textAlign: "center",
                                        alignItems:"center",
                                        justifyContent:"center"

                                    }}
                                >
                                    i
                                </button>
                            </div>

                            {showSenhaInfo && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-10px",
                                        right: "-5px",
                                        width: "250px",
                                        zIndex: 10,
                                        background: "#e7f3ff",
                                        border: "1px solid #c9def7",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                                        fontSize: "12px",
                                        color: "#004085"
                                    }}
                                >
                                    <strong>Requisitos da senha:</strong>
                                    <p style={ruleStyle(rules.min)}>
                                        • Minimo 8 caracteres {rules.min ? "✔" : ""}
                                    </p>
                                    <p style={ruleStyle(rules.upper)}>
                                        • 1 letra maiuscula {rules.upper ? "✔" : ""}
                                    </p>
                                    <p style={ruleStyle(rules.lower)}>
                                        • 1 letra minuscula {rules.lower ? "✔" : ""}
                                    </p>
                                    <p style={ruleStyle(rules.number)}>
                                        • 1 numero {rules.number ? "✔" : ""}
                                    </p>
                                    <p style={ruleStyle(rules.special)}>
                                        • 1 caractere especial (@$!%*?&) {rules.special ? "✔" : ""}
                                    </p>
                                </div>
                            )}

                            <input
                                type={showCadastroSenha ? "text" : "password"}
                                id="cadastroSenha"
                                placeholder="Minimo 8 caracteres"
                                required
                                value={cadastro.senha}
                                onChange={(e) => setCadastro((prev) => ({ ...prev, senha: e.target.value }))}
                            />
                            <span
                                id="olho-cadastro"
                                onClick={() => setShowCadastroSenha((prev) => !prev)}
                                style={{ cursor: "pointer" }}
                            >
                                olho
                            </span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cadastroCPF">CPF:</label>
                            <input
                                maxLength="11"
                                type="text"
                                id="cadastroCPF"
                                placeholder="12345678900"
                                required
                                value={cadastro.cpf}
                                onChange={(e) => setCadastro((prev) => ({ ...prev, cpf: e.target.value }))}
                            />
                        </div>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                <div className={`form-section ${tab === "login" ? "active" : ""}`}>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email:</label>
                            <input
                                type="email"
                                id="loginEmail"
                                placeholder="exemplo@email.com"
                                required
                                value={login.email}
                                onChange={(e) => setLogin((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="loginSenha">Senha:</label>
                            <input
                                type={showLoginSenha ? "text" : "password"}
                                id="loginSenha"
                                placeholder="Sua senha"
                                required
                                value={login.senha}
                                onChange={(e) => setLogin((prev) => ({ ...prev, senha: e.target.value }))}
                            />
                            <span
                                id="olho-login"
                                onClick={() => setShowLoginSenha((prev) => !prev)}
                                style={{ cursor: "pointer" }}
                            >
                                olho
                            </span>
                        </div>

                        <button type="submit">Entrar</button>
                    </form>
                </div>

                <div className={`message ${message.type}`} style={{ display: message.text ? "block" : "none" }}>
                    {message.text}
                </div>
            </div>
        </div>
    )
}

export default Form;