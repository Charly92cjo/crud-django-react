import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea actualizada", {
        position: "bottom-center",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("Tarea creada", {
        position: "bottom-center",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 rounded-lg p-3 mb-3 block w-full"
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          placeholder="Description"
          rows="3"
          {...register("description", { required: true })}
          className="bg-zinc-700 rounded-lg p-3 mb-3 block w-full"
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {params.id && (
        <div className="flex justify-end">
        <button
        className="bg-red-500 p-3 rounded-lg block w-48 mt-3"
          onClick={async () => {
            const accepted = window.confirm(
              "Locura! esta completamente seguro que queres deletear esta tarea?, Wachin?"
            );
            if (accepted) {
              await deleteTask(params.id);
              toast.success("Tarea Eliminada", {
                position: "bottom-center",
                style: {
                  background: "#101010",
                  color: "#fff",
                },
              });
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  );
};

export default TaskFormPage;
