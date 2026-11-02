import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import styles from "./Admin.module.css";

export default function AdminMensagens() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [resposta, setResposta] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [enviando, setEnviando] = useState(false);

  const carregar = () =>
    api
      .get("/mensagens/admin")
      .then(({ data }) => {
        const mensagens = data || [];

        setItems(mensagens);
        setSelected((atual) =>
          atual
            ? mensagens.find((mensagem) => mensagem.id === atual.id) || null
            : mensagens[0] || null
        );
      })
      .catch(() => {
        setErro(
          "Falha ao carregar mensagens. Confirme se o backend atualizado está ativo e seu usuário tem perfil ADMIN."
        );
      });

  useEffect(() => {
    carregar();
  }, []);

  const filtradas = useMemo(
    () =>
      items.filter((mensagem) => {
        const termo = busca.toLowerCase();
        const texto = [
          mensagem.emissor,
          mensagem.email,
          mensagem.texto,
        ]
          .join(" ")
          .toLowerCase();

        const correspondeAoFiltro =
          filtro === "todas" ||
          (filtro === "pendentes" && !mensagem.respostaAdmin) ||
          (filtro === "respondidas" && mensagem.respostaAdmin);

        return texto.includes(termo) && correspondeAoFiltro;
      }),
    [items, busca, filtro]
  );

  const abrir = async (mensagem) => {
    setSelected(mensagem);
    setResposta(mensagem.respostaAdmin || "");
    setErro("");
    setOk("");

    try {
      await api.put(`/mensagens/${mensagem.id}/abrir`);
    } catch {
      // A falha ao marcar como aberta não impede a leitura da mensagem.
    }
  };

  const enviar = async (evento) => {
    evento.preventDefault();

    if (!selected || !resposta.trim()) {
      return;
    }

    setEnviando(true);
    setErro("");
    setOk("");

    try {
      const { data } = await api.post(
        `/mensagens/${selected.id}/responder`,
        { resposta: resposta.trim() }
      );

      setSelected(data);
      setOk("Resposta enviada por e-mail e salva no histórico.");
      setResposta(data.respostaAdmin || resposta);

      await carregar();
    } catch (erroEnvio) {
      setErro(
        erroEnvio.response?.data?.message ||
          "Não foi possível enviar. Confira as configurações de e-mail do backend."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className={styles.headingRow}>
        <div>
          <span className={styles.eyebrow}>RELACIONAMENTO</span>
          <h1 className={styles.pageTitle}>Fale conosco</h1>
          <p className={styles.pageSub}>
            Leia o que as pessoas enviaram e responda diretamente por e-mail.
          </p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Buscar por nome, e-mail ou mensagem…"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />

        <select
          className={styles.select}
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
        >
          <option value="todas">Todas as mensagens</option>
          <option value="pendentes">Aguardando resposta</option>
          <option value="respondidas">Respondidas</option>
        </select>
      </div>

      <div className={styles.messageLayout}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              Caixa de entrada{" "}
              <span style={{ color: "#8995ad" }}>({filtradas.length})</span>
            </h2>
          </div>

          <div className={styles.messageList}>
            {filtradas.map((mensagem) => (
              <button
                key={mensagem.id}
                className={`${styles.messageItem} ${
                  selected?.id === mensagem.id
                    ? styles.messageSelected
                    : ""
                }`}
                onClick={() => abrir(mensagem)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <strong>{mensagem.emissor}</strong>
                  <span
                    className={
                      mensagem.respostaAdmin
                        ? styles.badge
                        : styles.badgeUnread
                    }
                  >
                    {mensagem.respostaAdmin ? "Respondida" : "Nova"}
                  </span>
                </div>

                <p>{mensagem.texto}</p>

                <div className={styles.messageMeta}>
                  <span>{mensagem.email}</span>
                  <span>
                    {mensagem.dataMensagem
                      ? new Date(mensagem.dataMensagem).toLocaleDateString(
                          "pt-BR"
                        )
                      : ""}
                  </span>
                </div>
              </button>
            ))}

            {!filtradas.length && (
              <div className={styles.empty}>
                Nenhuma mensagem encontrada.
              </div>
            )}
          </div>
        </section>

        <section className={styles.panel}>
          {selected ? (
            <div className={styles.messageBody}>
              <span className={styles.eyebrow}>
                MENSAGEM #{selected.id}
              </span>

              <h3>{selected.emissor}</h3>

              <div className={styles.messageMeta}>
                <span>{selected.email}</span>
                <span>{selected.telefone || "Sem telefone"}</span>
              </div>

              <p>{selected.texto}</p>

              {selected.respostaAdmin && (
                <div className={styles.notice}>
                  <strong>Resposta já enviada</strong>
                  <br />
                  {selected.respostaAdmin}
                </div>
              )}

              <form onSubmit={enviar}>
                <div className={styles.formGroup}>
                  <label htmlFor="resposta">Sua resposta</label>
                  <textarea
                    id="resposta"
                    className={styles.textarea}
                    value={resposta}
                    onChange={(evento) => setResposta(evento.target.value)}
                    placeholder="Escreva uma resposta clara e acolhedora…"
                    required
                  />
                </div>

                <div className={styles.notice}>
                  A resposta será enviada para <strong>{selected.email}</strong>{" "}
                  usando o serviço de e-mail configurado no backend.
                </div>

                <button
                  className={styles.primaryButton}
                  disabled={enviando}
                >
                  {enviando
                    ? "Enviando…"
                    : "↗ Enviar resposta por e-mail"}
                </button>

                {erro && <p className={styles.error}>{erro}</p>}
                {ok && <p className={styles.success}>{ok}</p>}
              </form>
            </div>
          ) : (
            <div className={styles.empty}>
              Selecione uma mensagem para ver os detalhes e responder.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
