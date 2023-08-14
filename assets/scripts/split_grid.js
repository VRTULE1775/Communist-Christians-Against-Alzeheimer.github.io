document.addEventListener('DOMContentLoaded', function() {
  const regular_grids = Array.from(document.querySelectorAll('.regular-grid'));

  function update_grid_layout(regular_grid) {
    const members = Array.from(regular_grid.querySelectorAll('.card'));
    const container_width = regular_grid.clientWidth; // Use clientWidth here
    const min_entry_width = parseInt(regular_grid.dataset.minEntryWidth) || 300;
    const gap = 10;

    const max_per_row = parseInt(regular_grid.dataset.maxPerRow) || 3;
    const members_per_row = Math.max(1, Math.min(max_per_row, Math.floor((container_width + gap) / (min_entry_width + gap))));

    members.forEach((member, index) => {
      const row = Math.floor(index / members_per_row);
      const col = index % members_per_row;
      member.style.gridRow = `${row + 1} / span 1`;
      member.style.gridColumn = `${col + 1} / span 1`;
    });
  }

  function wait_for_visibility() {
    regular_grids.forEach(regular_grid => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            update_grid_layout(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(regular_grid);
    });
  }

  wait_for_visibility();

  const mutationObserver = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'attributes' && (mutation.attributeName === 'data-min-entry-width' || mutation.attributeName === 'data-max-per-row')) {
        const target = mutation.target.closest('.regular-grid');
        if (target) {
          update_grid_layout(target);
        }
      }
    });
  });

  regular_grids.forEach(regular_grid => {
    mutationObserver.observe(regular_grid, { attributes: true });
  });

  window.addEventListener('resize', () => {
    regular_grids.forEach(update_grid_layout);
  });
});