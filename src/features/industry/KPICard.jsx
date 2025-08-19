import React from 'react';
import { Card, Stack } from 'react-bootstrap';

const KPICard = ({ title, value, icon, format = (val) => val }) => {
  return (
    <Card className="kpi-card">
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <div className="icon">{icon}</div>
          <div>
            <Card.Subtitle className="text-muted mb-2">{title}</Card.Subtitle>
            <Card.Title as="h3">{format(value)}</Card.Title>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default KPICard;