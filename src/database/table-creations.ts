import { schemas } from "./schemas";
import { getCreateSQL } from "./shared/get-create-sql";

export default schemas.map((schema) => getCreateSQL(schema));
