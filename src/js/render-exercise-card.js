const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

const renderMetaControl = (exercise, options) => {
  if (options.metaType === 'favorite') {
    return `
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${escapeHtml(exercise.name)} from favorites"
        data-action="${options.onMetaAction}"
        data-exercise-id="${exercise._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="./img/icons.svg#trash"></use>
        </svg>
      </button>
    `;
  }

  const rating = Number(exercise.rating ?? 0).toFixed(1);

  return `
    <button
      type="button"
      class="rating-subgroup"
      aria-label="Rate this exercise"
      data-action="${options.onMetaAction ?? 'exercise:rate'}"
      data-exercise-id="${exercise._id}"
    >
      <span class="rating-span">${rating}</span>
      <svg class="rating-svg" aria-hidden="true">
        <use href="./img/icons.svg#star_yellow"></use>
      </svg>
    </button>
  `;
};

export const renderExerciseCard = (exercise, options = {}) => {
  const normalizedOptions = {
    listItemClassName: 'exercises-item',
    metaType: 'rating',
    onStartAction: 'exercise:start',
    onMetaAction:
      options.metaType === 'favorite'
        ? 'favorite-exercise:remove'
        : 'exercise:rate',
    ...options,
  };

  return `
    <li class="${normalizedOptions.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${exercise._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${renderMetaControl(exercise, normalizedOptions)}
            </div>

            <button
              type="button"
              class="start-btn"
              data-action="${normalizedOptions.onStartAction}"
              data-exercise-id="${exercise._id}"
            >
              <span class="start-span">Start</span>
              <svg class="start-svg" aria-hidden="true">
                <use href="./img/icons.svg#arrow-next-page"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-card-name">
            <div class="human-svg-wrapper" aria-hidden="true">
              <svg class="human-svg">
                <use href="./img/icons.svg#running_figure_white"></use>
              </svg>
            </div>
            <h3 class="exercise-card-title">${escapeHtml(exercise.name)}</h3>
          </div>

          <ul class="exercise-info" aria-label="Exercise details">
            <li class="exercise-info-item">
              <span class="info-label calories">Burned calories:</span>
              <span class="info-value calories">${exercise.burnedCalories} / ${exercise.time} min</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label body-part">Body part:</span>
              <span class="info-value body-part">${escapeHtml(exercise.bodyPart)}</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label target">Target:</span>
              <span class="info-value target">${escapeHtml(exercise.target)}</span>
            </li>
          </ul>
        </div>
      </article>
    </li>
  `;
};
