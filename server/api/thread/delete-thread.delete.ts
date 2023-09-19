import ThreadModel from "~/service/models/thread";

export default defineEventHandler(async (event) => {
  try {
    // connectToDB();

    const { id } = await readBody(event);

    await ThreadModel.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error(`Failed to delete thread. Error message: ${error.message}`);
  }
});
