import { ProjectModel } from '../common/model';

export async function formatProject(items, favoriteDAO, callback) {
  let keys = [];
  try {
    keys = await favoriteDAO.getFavoriteKeys();
  } catch (e) {
    // console.log(e)
  }
  const projects = items.map(item => {
    let isFavorite = false;
    if (keys) {
      isFavorite = keys.some(
        key => key === (item.id ? item.id.toString() : item.fullName)
      );
    }
    return new ProjectModel(item, isFavorite);
  });
  if (typeof callback === 'function') {
    callback(projects);
  }
}
