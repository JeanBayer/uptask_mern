import moongose from "mongoose";

const proyectoSchema = moongose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      required: true,
      trim: true,
    },
    creador: {
      type: moongose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    colaboradores: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  { timestamps: true }
);

const Proyecto = moongose.model("Proyecto", proyectoSchema);
export default Proyecto;
