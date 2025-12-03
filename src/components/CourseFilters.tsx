import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, BookOpen, FlaskConical, FolderKanban } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

export function CourseFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  categories
}: CourseFiltersProps) {
  const types = [
    { value: 'Theory', label: 'Theory', icon: BookOpen },
    { value: 'Lab', label: 'Lab', icon: FlaskConical },
    { value: 'Project', label: 'Project', icon: FolderKanban },
  ];

  const hasFilters = searchQuery || selectedType || selectedCategory;

  const clearFilters = () => {
    onSearchChange('');
    onTypeChange(null);
    onCategoryChange(null);
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-xl border border-border shadow-soft">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search courses by name or code..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground flex items-center mr-2">Type:</span>
        {types.map(({ value, label, icon: Icon }) => (
          <Badge
            key={value}
            variant={selectedType === value ? 'default' : 'outline'}
            className={cn(
              "cursor-pointer transition-all px-3 py-1.5",
              selectedType === value 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            )}
            onClick={() => onTypeChange(selectedType === value ? null : value)}
          >
            <Icon className="h-3.5 w-3.5 mr-1.5" />
            {label}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground flex items-center mr-2">Category:</span>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={cn(
              "cursor-pointer transition-all px-3 py-1.5",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            )}
            onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
