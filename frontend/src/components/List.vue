<template>
<main>
  <div class="row">
    <div id="monitorias-disponiveis" class="columnleft">
        <h1>Monitorias Disponíveis</h1>

        <table class="table table-hover">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>  
            <tr v-for="monitoria in allMonitorias" :key="monitoria._id">
              <td>{{ monitoria.disciplina }}</td>
              <td>{{ monitoria.date }}</td>
              <td>{{ monitoria.time }}</td>
              <td>{{ monitoria.place }}</td>
            </tr>        
          </tbody>
        </table>
    </div>
    <div class="columnright">
      <h2>Oferecer Monitoria</h2>
      <form @submit.prevent="addMonitoria">
        <input type="text" v-model="disciplina" placeholder="Disciplina da monitoria" required />
        <input type="date" v-model="date" placeholder="Data da monitoria" required />
        <input type="time" v-model="time" placeholder="Horário da monitoria" required />
        <input type="text" v-model="place" placeholder="Local da monitoria" required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        <li v-for="monitoria in monitorias" :key="monitoria._id">
          <div class="monitoria-disciplina">
            {{ monitoria.disciplina }}
          </div>
          <div class="monitoria-disciplina">
            {{ monitoria.date }}
          </div>
          <div class="monitoria-disciplina">
            {{ monitoria.time }}
          </div>
          <div class="monitoria-disciplina">
            {{ monitoria.place }}
          </div>
          <div class="actions">
            <button @click="deleteMonitoria(monitoria._id)">Excluir</button>
            <button @click="showUpdateForm(monitoria)">Atualizar</button>
          </div>
          <div v-if="beingEdited && beingEdited._id === monitoria._id" class="edit">
            <h3>Editar Tarefa</h3>
            <form @submit.prevent="updateAndHide">
              <input type="text" v-model="beingEdited.disciplina" required />
              <input type="date" v-model="beingEdited.date" required />
              <input type="time" v-model="beingEdited.time" required />
              <input type="text" v-model="beingEdited.place" required />
              <button type="submit">Salvar</button>
              <button type="button" @click="beingEdited = null">Cancelar</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</main>
</template>

<script>
import { getTasks, createTask, updateTask, deleteTask, getAllMonitorias } from "../api";

export default {
  data() {
    return {
      monitorias: [],
      allMonitorias: [],
      disciplina: "",
      date: "",
      time: "",
      place: "",
      beingEdited: null,
      userId: null,
    };
  },
  methods: {
    async loadUserMonitorias(userId) {
      this.userId = userId;
      this.monitorias = await getTasks(userId);
    },
    async loadAllMonitorias() {
      console.log("allMonitorias: " )
      this.allMonitorias = await getAllMonitorias();
    },
    async addMonitoria() {
      const monitoria = {
        disciplina: this.disciplina,
        date: this.date,
        time: this.time,
        place: this.place,
        done: false,
      };
      const created = await createTask(monitoria, this.userId);
      this.monitorias.push(created);
      this.disciplina = "";
      this.date = "";
      this.time = "";
      this.place = "";
      this.loadAllMonitorias();
    },
    async deleteMonitoria(monitoriaId) {
      await deleteTask(monitoriaId);
      this.monitorias = this.monitorias.filter((monitoria) => monitoria._id !== monitoriaId);
      this.loadAllMonitorias();
    },
    showUpdateForm(monitoria) {
      this.beingEdited = monitoria;
  },
    async updateAndHide() {
      await updateTask(this.beingEdited._id, this.beingEdited);
      this.beingEdited = null;
      this.loadAllMonitorias();
  },
  },
};
</script>

<!-- Add your scoped styles here -->

  
<style scoped>
* {
  box-sizing: border-box;
}

div {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 0.2rem;   /* aumentado de 1rem para 2rem */
  font-family: Arial, sans-serif;
  width: 100%;
}

h2, h3 {
  color: #333;
  margin-bottom: 1rem;  /* adicionado para dar espaço entre o título e o formulário abaixo */
}

form {
  display: flex;
  flex-direction: column; /* Adiciona isso para tornar o formulário de edição vertical */
  width: 75%;
  margin-bottom: 1rem;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  margin-bottom: 0.5rem; /* Adiciona isso para dar espaço entre os elementos do formulário */
  border: none;
  border-radius: 5px;
}

input {
  flex-grow: 1;
  padding: 0.5rem 0.5rem; /* Adicione um pouco mais de padding vertical */
  margin-bottom: 0.5rem; /* Adiciona isso para dar espaço entre os elementos do formulário */
  border: 3px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #103c5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
}

button:hover {
  background-color: #14181d;
  color: white;
  cursor: pointer;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  justify-content: start;
  align-items: flex-start; /* adicione esta linha */
  width: 100%;
  gap: 1rem;
}

li {
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 1px;
  flex-basis: 10%; /* faz com que a task ocupe um terço da largura total, descontando a margem */
}

.monitoria-disciplina {
  margin-bottom: 0.1rem;
  align-items: center;
}

.actions {
  display: flex;   
  flex-direction: row;  
  justify-content: center; /* Centraliza os botões */
  gap: 0.5rem;  
}

li:nth-child(3n) {
  margin-right: 0; /* Remove a margem direita da terceira task de cada linha para evitar espaçamento extra no final da linha */
}

li:nth-child(odd) {
  background-color: #e6e6e6;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.columnleft {
  flex: 1;
  justify-content: center;
}

.columnright {
  flex: 1;
  justify-content: center;
}

.edit {  
  align-items: center;
}

table {
  margin-top: 2rem;
  margin-right: 2rem;
}

th {
  background-color: #103c5c;
  color: white;
  text-transform: capitalize;
}

</style>

