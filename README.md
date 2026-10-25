# 🗳️ Análise Eleitoral Brasil - TSE (Presidenciais)

Aplicação web desenvolvida por **@brendan (Desenvolvedor Frontend Sênior)** para análise avançada dos resultados das eleições presidenciais do Brasil, contemplando mapas interativos de calor por seção eleitoral, rastreamento de mudanças de endereço entre o 1º e 2º turnos e estatísticas detalhadas de votação.

---

## 🚀 Principais Recursos

1. **Mapa Interativo (Heatmap / Calor por Seção)**:
   - Visualização geográfica via Leaflet e CartoDB Dark Matter.
   - Indicador visual do candidato vencedor (Lula vs Bolsonaro) em cada seção, zona, município, estado e região.
   - Filtros dinâmicos por Região, UF e Município.

2. **Seções Afetadas por Mudança de Endereço (1º ➔ 2º Turno)**:
   - Listagem oficial e filtrável das seções que sofreram alteração de local de votação entre os turnos.
   - Comparativo direto mostrando o endereço original e o novo endereço, além de destacar o vencedor em cada seção afetada.

3. **Estatísticas e Percentuais Detalhados**:
   - Detalhamento completo de votos nominais, brancos, nulos, abstenções e comparecimento por seção selecionada.
   - Gráficos estatísticos interativos (Chart.js) com a distribuição nacional e por região.

4. **Pronto para Produção na Vercel**:
   - Configurado com `vercel.json` e otimizado para deploy instantâneo.

---

## 🛠️ Como Executar Localmente

```bash
cd /home/ubuntu/tse-eleicoes-analise
python3 -m http.server 5000
```
Acesse em: `http://localhost:5000`
