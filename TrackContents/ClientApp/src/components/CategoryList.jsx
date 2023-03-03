import React from 'react';
import CategorySection from './CategorySection';
import TotalSection from './TotalSection';

export default function CategoryList({ categories, total, refreshCategories }) {

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((c) => c.contentItems !== 'undefined' && c.contentItems.length > 0 ? 
          <CategorySection
            key={c.categoryId}
            keyData={c.categoryId}
            category={c.categoryName}
            amount={c.categoryAmount}
            contentItems={c.contentItems}
            refreshCategories={refreshCategories}></CategorySection> : <></>) }
        <TotalSection categories={categories} total={total} />
      </div>
    </div>
  );
}