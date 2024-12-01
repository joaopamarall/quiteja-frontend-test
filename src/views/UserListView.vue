<template>
  <v-container class="userList pt-16 text-start">
    <v-btn><router-link to="/" class="text-decoration-none">
      <v-icon left> mdi-arrow-left </v-icon>
      Voltar</router-link>
    </v-btn>
    <v-row class="d-flex justify-center align-center ma-0">
      <v-col cols="6">
        <v-data-table
          class="elevation-1 d-flex flex-column"
          :headers="headers"
          :items="items"
          item-key="id"
          :items-per-page="5"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Lista de usuários</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item="items">
            <tr>
              <td>
                <img
                  :src="items.item.picture"
                  alt="Foto de perfil"
                  style="height: 80px"
                />
              </td>
              <td>{{ items.item.fullName }}</td>
              <td>{{ items.item.title }}</td>
              <td>
                <router-link :to="`/user/${items.item.id}`"
                  >Ver Detalhes</router-link
                >
              </td>
              <td>
                <v-btn
                  class="ma-1"
                  color="primary"
                  icon
                  @click="editUser(items.item)"
                  ><v-icon left class="ma-1 d-flex justify-center align-center">
                    mdi-pencil
                  </v-icon></v-btn
                >
                <v-btn
                  class="ma-1"
                  color="rgb(218, 62, 62)"
                  icon
                  @click="deleteUser(items.item)"
                  ><v-icon left class="ma-1 d-flex justify-center align-center">
                    mdi-delete
                  </v-icon></v-btn
                >
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-alert type="info" :value="true"
              >Nenhum usuário encontrado.</v-alert
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.firstName" label="Nome" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.lastName" label="Sobrenome" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.title" label="Título" />
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="editedItem.picture"
                  label="URL da Foto"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveUser">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Você tem certeza que deseja excluir este usuário?</v-card-title
        >
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn color="red" text @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getDataUser } from "@/services/api";

export default {
  name: "UserList",
  data() {
    return {
      headers: [
        {
          text: "Foto de perfil",
          value: "picture",
          sortable: false,
          align: "center",
        },
        { text: "Nome completo", value: "fullName", align: "center" },
        { text: "Título", value: "title", align: "center" },
        {
          text: "Detalhes do Usuário",
          value: "detail",
          sortable: false,
          align: "center",
        },
        { text: "Ações", value: "actions", sortable: false, align: "center" },
      ],
      items: [],
      formTitle: "Editar Usuário",
      dialog: false,
      dialogDelete: false,
      editedItem: {
        id: null,
        firstName: "",
        lastName: "",
        picture: "",
      },
      itemToDelete: null,
    };
  },
  async created() {
    try {
      const response = await getDataUser();
      this.items = response.data.data.map((user) => ({
        id: user.id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        picture: user.picture,
      }));
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
    }
  },
  methods: {
    editUser(user) {
      this.formTitle = "Editar Usuário";
      this.editedItem = { ...user };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveUser() {
      const findIndexItem = this.items.findIndex(
        (item) => item.id === this.editedItem.id
      );
      if (findIndexItem !== -1) {
        this.$set(this.items, findIndexItem, {
          ...this.editedItem,
          fullName: this.editedItem.firstName + " " + this.editedItem.lastName,
        });
      } else {
        console.log("Usuário não encontrado para atualização.");
      }
      this.closeDialog();
    },
    deleteUser(user) {
      this.itemToDelete = user;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    confirmDelete() {
      const index = this.items.findIndex(
        (item) => item.id === this.itemToDelete.id
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.closeDelete();
    },
  },
};
</script>
<style lang="scss">
.userList {
  img {
    margin-top: 8px;
  }
}
</style>
