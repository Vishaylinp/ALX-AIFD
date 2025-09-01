-- Create the 'polls' table
CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'options' table for poll options
CREATE TABLE options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

-- Create the 'votes' table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option_id UUID REFERENCES options(id) ON DELETE CASCADE,

  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE, -- Add this column
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for 'polls' table
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

-- Policy for 'polls': all users can create polls
CREATE POLICY "All users can create polls" ON polls
  FOR INSERT WITH CHECK (TRUE);

-- Policy for 'polls': all users can view polls
CREATE POLICY "All users can view polls" ON polls
  FOR SELECT USING (TRUE);

-- Enable Row Level Security (RLS) for 'options' table
ALTER TABLE options ENABLE ROW LEVEL SECURITY;

-- Policy for 'options': all users can create options
CREATE POLICY "All users can create options" ON options
  FOR INSERT WITH CHECK (TRUE);

-- Policy for 'options': all users can view options
CREATE POLICY "All users can view options" ON options
  FOR SELECT USING (TRUE);


-- Enable Row Level Security (RLS) for 'votes' table
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policy for 'votes': all users can insert votes
CREATE POLICY "All users can insert votes" ON votes
  FOR INSERT WITH CHECK (TRUE);

-- Policy for 'votes': all users can view votes
CREATE POLICY "All users can view votes" ON votes
  FOR SELECT USING (TRUE);