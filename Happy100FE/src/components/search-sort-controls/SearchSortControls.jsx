import PropTypes from 'prop-types';
import {
  ControlsForm,
  SortSelect,
  SearchSelect,
  SearchInput,
  SearchButton,
} from './style';

export default function SearchSortControls({
  sortOptions,
  searchOptions,
  sortValue,
  onSortChange,
  searchTypeValue,
  onSearchTypeChange,
  keywordValue,
  onKeywordChange,
  onSubmit,
  placeholder = '검색어를 입력하세요',
  submitLabel = '검색',
  submitDisabled = false,
  className,
  showSort = true,
  showSearchType = true,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = typeof keywordValue === 'string' ? keywordValue.trim() : '';
    onSubmit?.(trimmed, event);
  };

  return (
    <ControlsForm className={className} onSubmit={handleSubmit}>
      {showSort && sortOptions.length > 0 && (
        <SortSelect
          value={sortValue}
          onChange={(event) => onSortChange?.(event.target.value, event)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SortSelect>
      )}

      {showSearchType && searchOptions.length > 0 && (
        <SearchSelect
          value={searchTypeValue}
          onChange={(event) => onSearchTypeChange?.(event.target.value, event)}
        >
          {searchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SearchSelect>
      )}

      <SearchInput
        value={keywordValue}
        onChange={(event) => onKeywordChange?.(event.target.value, event)}
        placeholder={placeholder}
      />

      <SearchButton type="submit" disabled={submitDisabled}>
        {submitLabel}
      </SearchButton>
    </ControlsForm>
  );
}

SearchSortControls.propTypes = {
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  sortValue: PropTypes.string,
  onSortChange: PropTypes.func,
  searchTypeValue: PropTypes.string,
  onSearchTypeChange: PropTypes.func,
  keywordValue: PropTypes.string,
  onKeywordChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string,
  submitDisabled: PropTypes.bool,
  className: PropTypes.string,
  showSort: PropTypes.bool,
  showSearchType: PropTypes.bool,
};

SearchSortControls.defaultProps = {
  sortOptions: [],
  searchOptions: [],
  sortValue: '',
  onSortChange: undefined,
  searchTypeValue: '',
  onSearchTypeChange: undefined,
  keywordValue: '',
  onKeywordChange: undefined,
  onSubmit: undefined,
  placeholder: '검색어를 입력하세요',
  submitLabel: '검색',
  submitDisabled: false,
  className: undefined,
  showSort: true,
  showSearchType: true,
};
