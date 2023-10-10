import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Keychains from './Keychains';
import Plushies from './Plushies';
import OnSale from './OnSale';
import AllProducts from './AllProducts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({products, filterBy}) {
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Product Tabs"
        sx={{ borderRight: 1, borderColor: 'divider'}}
      >
        <Tab label="All Products" {...a11yProps(0)} />
        <Tab label="Keychains" {...a11yProps(1)} />
        <Tab label="Plushies" {...a11yProps(2)} />
        <Tab label="OnSale" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{maxWidth: '80%'}}>
        <AllProducts products={products} filterBy={filterBy}/>
      </TabPanel>
      <TabPanel value={value} index={1} style={{maxWidth: '80%'}}>
        <Keychains products={products} filterBy={filterBy}/>
      </TabPanel>
      <TabPanel value={value} index={2} style={{maxWidth: '80%'}}>
        <Plushies products={products} filterBy={filterBy}/>
      </TabPanel>
      <TabPanel value={value} index={3} style={{maxWidth: '80%'}}>
        <OnSale products={products} filterBy={filterBy}/>
      </TabPanel>
    </Box>
  );
}
